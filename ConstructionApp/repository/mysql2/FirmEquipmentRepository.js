const db = require('../../config/mysql2/db');
const firmEquipmentSchema = require('../../model/joi/FirmEquipment');

exports.getFirmEquipments = () => {
    const query = `SELECT sf.Id, sf.Ilosc, sf.Wypozyczone,
    f.Nazwa as fNazwa,
    s.Nazwa as sNazwa
    from SprzetFirmy sf
    left join Firma f on sf.FId = f.Id
    left join Sprzet s on sf.SId = s.Id`;

    return db.promise().query(query).then( (results, fields) => {
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getFirmEquipmentById = (firmEquipmentId) => {
    const query = `SELECT sf.Id as sf_Id, sf.Ilosc, sf.Wypozyczone,
    f.Nazwa as fNazwa, f.Id as f_Id,
    s.Nazwa as sNazwa, s.Id as s_Id
    from SprzetFirmy sf
    left join Firma f on sf.FId = f.Id
    left join Sprzet s on sf.SId = s.Id
    where sf.Id = ?`;

    return db.promise().query(query, [firmEquipmentId])
        .then( (results, fields) => {
            const row = results[0][0];
            if (!row){
                return {};
            }

            const w = row.Wypozyczone === 1;

            return {
                Id: parseInt(firmEquipmentId),
                Ilosc: row.Ilosc,
                Wypozyczone: w,
                Firma: {
                    Id: row.f_Id,
                    Nazwa: row.fNazwa
                },
                Sprzet: {
                    Id: row.s_Id,
                    Nazwa: row.sNazwa
                }
            };
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getFirmEquipmentByFirmId = (firmId) => {
    const query = `SELECT sf.Id as sf_Id, sf.Ilosc, sf.Wypozyczone,
    f.Nazwa as fNazwa,
    s.Nazwa as sNazwa
    from SprzetFirmy sf
    left join Firma f on sf.FId = f.Id
    left join Sprzet s on sf.SId = s.Id
    where sf.FId = ?`;

    return db.promise().query(query, [firmId]).then( (results, fields) => {
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.getFirmEquipmentByEquipmentId = (equipmentId) => {
    const query = `SELECT sf.Id as sf_Id, sf.Ilosc, sf.Wypozyczone,
    f.Nazwa as fNazwa,
    s.Nazwa as sNazwa
    from SprzetFirmy sf
    left join Firma f on sf.FId = f.Id
    left join Sprzet s on sf.SId = s.Id
    where sf.SId = ?`;

    return db.promise().query(query, [equipmentId]).then( (results, fields) => {
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.createFirmEquipment = (newFirmEquipmentData) => {
    const vRes = firmEquipmentSchema.validate(newFirmEquipmentData, { abortEarly: false} );
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    const sql = 'INSERT into SprzetFirmy (FId, SId, Ilosc, Wypozyczone) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql,
        [newFirmEquipmentData.FId,
            newFirmEquipmentData.SId,
            newFirmEquipmentData.Ilosc,
            newFirmEquipmentData.Wypozyczone]);
};

exports.updateFirmEquipment = (firmEquipmentId, firmEquipmentData) => {
    const vRes = firmEquipmentSchema.validate(firmEquipmentData, { abortEarly: false });
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    const sql = `UPDATE SprzetFirmy set FId = ?, SId = ?, Ilosc = ?, Wypozyczone = ? where Id = ?`;
    return db.promise().execute(sql, [firmEquipmentData.FId,
        firmEquipmentData.SId,
        firmEquipmentData.Ilosc,
        firmEquipmentData.Wypozyczone,
        firmEquipmentId]);
};

exports.deleteFirmEquipment = (equipmentId) => {
    const sql = 'DELETE FROM SprzetFirmy where Id = ?';
    return db.promise().execute(sql , [equipmentId]);
};
