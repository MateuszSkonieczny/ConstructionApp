const db = require('../../config/mysql2/db');
const eqipmentSchema = require('../../model/joi/Equipment');

exports.getEquipments = () => {
    return db.promise().query('SELECT * FROM Sprzet').then( (results, fields) => {
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.getEquipmentById = (equipmentId) => {
    const query = `SELECT s.Id as Id, s.Nazwa as Nazwa, s.SprzetCiezki as SprzetCiezki,
    sf.Id as sfId, sf.Ilosc as Ilosc, sf.Wypozyczone as Wypozyczone, 
    f.Nazwa as fNazwa, f.Adres as fAdres, f.Id as fId
    FROM Sprzet s 
    left join SprzetFirmy sf on sf.SId = s.Id
    left join Firma f on sf.FId = f.Id
    where s.Id = ?`;

    return db.promise().query(query, [equipmentId]).then( (results, fields) => {
        const firstRow = results[0][0];
        if (!firstRow){
            return {};
        }

        const equipment = {
            Id: parseInt(equipmentId),
            Nazwa: firstRow.Nazwa,
            SprzetCiezki: firstRow.SprzetCiezki,
            firmEquipments: []
        }

        equipment.SprzetCiezki = equipment.SprzetCiezki === 1;

        for (let i=0; i<results[0].length; i++){
            const row = results[0][i];
            if (row.sfId){
                const firmEquipment = {
                    Id: row.sfId,
                    Ilosc: row.Ilosc,
                    Wypozyczone: row.Wypozyczone,
                    firm: {
                        Id: row.fId,
                        Nazwa: row.fNazwa,
                        Adres: row.fAdres
                    }
                };
                equipment.firmEquipments.push(firmEquipment);
            }
        }

        return equipment;
    }).catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createEquipment = (newEquipmentData) => {
    const vRes = eqipmentSchema.validate(newEquipmentData, { abortEarly: false } );
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    return checkNazwaUnique(newEquipmentData.Nazwa).then(NazwaErr => {
        if (NazwaErr) {
            return Promise.reject(NazwaErr);
        } else {
            const Nazwa = newEquipmentData.Nazwa;
            const SprzetCiezki = newEquipmentData.SprzetCiezki;
            const sql = 'INSERT into Sprzet (Nazwa, SprzetCiezki) VALUES (?, ?)';
            return db.promise().execute(sql, [Nazwa, SprzetCiezki]);
        }
    }).catch(err => {
        return Promise.reject(err);
    });

};

exports.updateEquipment = (equipmentId, equipmentData) => {
    const vRes = eqipmentSchema.validate(equipmentData, { abortEarly: false } );
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    return checkNazwaUnique(equipmentData.Nazwa, equipmentId).then(NazwaErr => {
        if (NazwaErr) {
            return Promise.reject(NazwaErr);
        } else {
            const Nazwa = equipmentData.Nazwa;
            const SprzetCiezki = equipmentData.SprzetCiezki;

            const sql = 'UPDATE Sprzet set Nazwa = ?, SprzetCiezki = ? where Id = ?';
            return db.promise().execute(sql, [Nazwa, SprzetCiezki, equipmentId]);
        }
    }).catch(err => {
        return Promise.reject(err);
    });
};

exports.deleteEquipment = (equipmentId) => {
    const sql1 = 'DELETE FROM SprzetFirmy where SId = ?';
    const sql2 = 'DELETE FROM Sprzet where Id = ?';

    return db.promise().execute(sql1, [equipmentId])
        .then(() => {
            return db.promise().execute(sql2, [equipmentId])
        });
};



checkNazwaUnique = (Nazwa, equipmentId) => {
    let sql, promise;
    if (equipmentId) {
        sql = `SELECT COUNT(1) as c FROM Sprzet where Id != ? and Nazwa = ?`;
        promise = db.promise().query(sql, [equipmentId, Nazwa]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Sprzet where Nazwa = ?`;
        promise = db.promise().query(sql, [Nazwa]);
    }


    return promise.then( (results, fields) => {
        const count = results[0][0].c;

        let err = { };
        if (count > 0) {
            err = {
                details: [{
                    path: ['Nazwa'],
                    message: 'Podana Nazwa jest już używana'
                }]
            };
            return err;
        }
    });
}
