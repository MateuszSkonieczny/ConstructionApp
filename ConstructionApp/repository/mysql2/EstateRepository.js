const db = require('../../config/mysql2/db');
const estateSchema = require('../../model/joi/Estate');

exports.getEstates = () => {
    return db.promise().query('SELECT * FROM Osiedle').then( (results, fields) => {
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getEstatebyId = (estateId) => {
    const query = `SELECT o.Id as Id, o.Adres as Adres, o.LiczbaBudynkow as LiczbaBudynkow,
    bud.Id as budId, bud.ImieManagera as ImieManagera, bud.NazwiskoManagera as NazwiskoManagera, 
    bud.DataZakonczenia as DataZakonczenia,
    f.Nazwa as Nazwa, f.Adres as fAdres, f.Id as fId
    FROM Osiedle o 
    left join Budowa bud on bud.OId = o.Id
    left join Firma f on bud.FId = f.Id
    where o.Id = ?`;


    return db.promise().query(query, [estateId]).then( (results, fields) => {
        const firstRow = results[0][0];
        if (!firstRow){
            return {};
        }

        const estate = {
            Id: parseInt(estateId),
            Adres: firstRow.Adres,
            LiczbaBudynkow: firstRow.LiczbaBudynkow,
            constructios: []
        }

        for (let i=0; i<results[0].length; i++){
            const row = results[0][i];
            if (row.budId){
                const construction = {
                    Id: row.budId,
                    ImieManagera: row.ImieManagera,
                    NazwiskoManagera: row.NazwiskoManagera,
                    DataZakonczenia: row.DataZakonczenia,
                    firm: {
                        Id: row.fId,
                        Nazwa: firstRow.Nazwa,
                        Adres: firstRow.fAdres
                    }
                };
                estate.constructios.push(construction);
            }
        }

        return estate;
    }).catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createEstate = (newEstateData) => {
    const vRes = estateSchema.validate(newEstateData, { abortEarly: false });
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    const Adres = newEstateData.Adres;
    const LiczbaBudynkow = newEstateData.LiczbaBudynkow;
    const sql = 'INSERT into Osiedle (Adres, LiczbaBudynkow) VALUES (?, ?)';
    return db.promise().execute(sql, [Adres, LiczbaBudynkow]);
};

exports.updateEstate = (estateId, estateData) => {
    const vRes = estateSchema.validate(estateData, { abortEarly: false });
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    const Adres = estateData.Adres;
    const LiczbaBudynkow = estateData.LiczbaBudynkow;
    const sql = `UPDATE Osiedle set Adres = ?, LiczbaBudynkow = ? where Id = ?`;
    return db.promise().execute(sql, [Adres, LiczbaBudynkow, estateId]);
};

exports.deleteEstate = (estateId) => {
    const sql1 = 'DELETE FROM Budowa where OId = ?';
    const sql2 = 'DELETE FROM Osiedle where Id = ?';

    return db.promise().execute(sql1, [estateId])
        .then(() => {
            return db.promise().execute(sql2, [estateId])
        });
};
