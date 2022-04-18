const db = require('../../config/mysql2/db');
const firmSchema = require('../../model/joi/Firm');
const newFirmSchema = require('../../model/joi/NewFirm');
const passwordSchema = require('../../model/joi/FirmPassword');
const authUtil = require('../../util/authUtils');
const Console = require("console");

exports.getFirms = () => {
    sql = `SELECT * FROM Firma Where Nazwa != ?`

    return db.promise().query(sql, ['admin']).then( (results, fields) => {
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.getFirmById = (firmId) => {
    const query = `SELECT f.Id as Id, f.Nazwa as Nazwa, f.Adres as Adres, f.password as password,
    bud.Id as budId, bud.ImieManagera as ImieManagera, bud.NazwiskoManagera as NazwiskoManagera, 
    bud.DataZakonczenia as DataZakonczenia,
    o.Adres as oAdres, o.LiczbaBudynkow as LiczbaBudynkow, o.Id as oId
    FROM Firma f 
    left join Budowa bud on bud.FId = f.Id
    left join Osiedle o on bud.OId = o.Id
    where f.Id = ?`;

    return db.promise().query(query, [firmId]).then( (results, fields) => {
        const firstRow = results[0][0];
        if (!firstRow){
            return {};
        }

        const firm = {
            Id: parseInt(firmId),
            Nazwa: firstRow.Nazwa,
            Adres: firstRow.Adres,
            password: firstRow.password,
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
                    estate: {
                        Id: row.oId,
                        Adres: row.oAdres,
                        LiczbaBudynkow: row.LiczbaBudynkow
                    }
                };
                firm.constructios.push(construction);
            }
        }

        return firm;
    }).catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getFirmByName = (firmName) => {
    const query = `SELECT Id, Nazwa, Adres, password FROM Firma where Nazwa = ?`;

    return db.promise().query(query, [firmName]).then( (results, fields) => {
        const firstRow = results[0][0];
        if (!firstRow){
            return {};
        }
        return {
            Id: firstRow.Id,
            Nazwa: firmName,
            password: firstRow.password
        };
    }).catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createFirm = (newFirmData) => {
    const vRes = newFirmSchema.validate(newFirmData, { abortEarly: false } );
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    return checkNazwaUniquee(newFirmData.Nazwa).then(NazwaErr => {
        if (NazwaErr) {
            return Promise.reject(NazwaErr);
        } else {
            const Nazwa = newFirmData.Nazwa;
            const Adres = newFirmData.Adres;
            const password = authUtil.hashPassword(newFirmData.password);
            const sql = 'INSERT into Firma (Nazwa, Adres, password) VALUES (?, ?, ?)';
            return db.promise().execute(sql, [Nazwa, Adres, password]);
        }
    }).catch(err => {
        return Promise.reject(err);
    });

};

exports.updateFirm = (firmId, firmData) => {//tutaj daj te req.__('opinion.form.add.btnLabel')
    const vRes = firmSchema.validate(firmData, { abortEarly: false } );
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    return checkNazwaUniquee(firmData.Nazwa, firmId).then(NazwaErr => {
        if (NazwaErr) {
            return Promise.reject(NazwaErr);
        } else {
            const Nazwa = firmData.Nazwa;
            const Adres = firmData.Adres;

            const sql = 'UPDATE Firma set Nazwa = ?, Adres = ? where Id = ?';
            return db.promise().execute(sql, [Nazwa, Adres, firmId]);
        }
    }).catch(err => {
        return Promise.reject(err);
    });
};

exports.deleteFirm = (firmId) => {
    const sql1 = 'DELETE FROM Budowa where FId = ?';
    const sql2 = 'DELETE FROM SprzetFirmy where FId = ?';
    const sql3 = 'DELETE FROM Opinia where FId = ?'
    const sql4 = 'DELETE FROM Firma where Id = ?';


    return   db.promise().execute(sql2, [firmId]).then(() => {
                db.promise().execute(sql3, [firmId]).then(() => {
                    db.promise().execute(sql1, [firmId]).then(() => {
                     db.promise().execute(sql4, [firmId])
                    })
                })
            })
};


checkNazwaUniquee = (Nazwa, firmId) => {
    let sql, promise;
    if (firmId) {
        sql = `SELECT COUNT(1) as c FROM Firma where Id != ? and Nazwa = ?`;
        promise = db.promise().query(sql, [firmId, Nazwa]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Firma where Nazwa = ?`;
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
};

checkPasswords = (pas1, pas2) => {
    if (pas1 !== pas2) {
        err = {
            details: [{
                path: ['NoweHaslo', 'PotwierdzHaslo'],
                message: 'Hasła muszą być takie same'
            }]
        }
        return err;
    } else {
        return false;
    }
};


exports.updateFirmPassword = (firmId, passwordData) => {
    const vRes = passwordSchema.validate(passwordData, { abortEarly: false } );
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    let NoweHaslo = passwordData.NoweHaslo;
    let PotwierdzHaslo = passwordData.PotwierdzHaslo;
    let check = checkPasswords(NoweHaslo, PotwierdzHaslo);

    if (check) {
        return Promise.reject(check);
    } else {
        NoweHaslo = authUtil.hashPassword(NoweHaslo);

        const sql = 'UPDATE Firma set password = ? where Id = ?';
        return db.promise().execute(sql, [NoweHaslo, firmId]);
    }
};
