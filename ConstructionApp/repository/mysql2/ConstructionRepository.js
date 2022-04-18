const db = require('../../config/mysql2/db');
const constructionSchema = require('../../model/joi/construction');

exports.getConstructions = () => {
    const query = `SELECT bud.Id, bud.ImieManagera, bud.NazwiskoManagera, bud.DataZakonczenia,
    f.Nazwa,
    o.Adres
    from Budowa bud
    left join Firma f on bud.FId = f.Id
    left join Osiedle o on bud.OId = o.Id`;

    return db.promise().query(query).then( (results, fields) => {
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getConstructionById = (constructionId) => {
    const query = `SELECT bud.Id as bud_Id, bud.ImieManagera, bud.NazwiskoManagera, bud.DataZakonczenia,
    f.Id as f_Id, f.Nazwa as Nazwa, f.Adres as f_Adres,
    o.Id as o_Id, o.Adres as o_Adres, o.LiczbaBudynkow
    from Budowa bud
    left join Firma f on bud.FId = f.Id
    left join Osiedle o on bud.OId = o.Id
    where bud.Id = ?`;

    return db.promise().query(query, [constructionId])
        .then( (results, fields) => {
            const row = results[0][0];
            if (!row){
                return {};
            }


            return {
                Id: parseInt(constructionId),
                ImieManagera: row.ImieManagera,
                NazwiskoManagera: row.NazwiskoManagera,
                DataZakonczenia: row.DataZakonczenia,
                Firma: {
                    Id: row.f_Id,
                    Nazwa: row.Nazwa
                },
                Osiedle: {
                    Id: row.o_Id,
                    Adres: row.o_Adres
                }
            };
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getConstructionByFirmId = (firmId) => {
    const query = `SELECT bud.Id as bud_Id, bud.ImieManagera, bud.NazwiskoManagera, bud.DataZakonczenia,
    f.Nazwa,
    o.Adres
    from Budowa bud
    left join Firma f on bud.FId = f.Id
    left join Osiedle o on bud.OId = o.Id
    where bud.FId = ?`;

    return db.promise().query(query, [firmId]).then( (results, fields) => {
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.getConstructionByEstateId = (estateId) => {
    const query = `SELECT bud.Id as bud_Id, bud.ImieManagera, bud.NazwiskoManagera, bud.DataZakonczenia,
    f.Nazwa,
    o.Adres
    from Budowa bud
    left join Firma f on bud.FId = f.Id
    left join Osiedle o on bud.OId = o.Id
    where bud.OId = ?`;

    return db.promise().query(query, [estateId]).then( (results, fields) => {
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.createConstruction = (newConstructionData) => {
    const vRes = constructionSchema.validate(newConstructionData, { abortEarly: false} );
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    newConstructionData.DataZakonczenia = newConstructionData.DataZakonczenia ? newConstructionData.DataZakonczenia : null;
    const sql = 'INSERT into Budowa (FId, OId, ImieManagera, NazwiskoManagera, DataZakonczenia) VALUES (?, ?, ?, ?, ?)';
    return db.promise().execute(sql,
        [newConstructionData.FId,
        newConstructionData.OId,
        newConstructionData.ImieManagera,
        newConstructionData.NazwiskoManagera,
        newConstructionData.DataZakonczenia]);
};

exports.updateConstruction = (constructionId, constructionData) => {
    const vRes = constructionSchema.validate(constructionData, { abortEarly: false });
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    constructionData.DataZakonczenia = constructionData.DataZakonczenia ? constructionData.DataZakonczenia : null;
    const sql = `UPDATE Budowa set FId = ?, OId = ?, ImieManagera = ?, NazwiskoManagera = ?, DataZakonczenia = ? where Id = ?`;
    return db.promise().execute(sql, [constructionData.FId,
        constructionData.OId,
        constructionData.ImieManagera,
        constructionData.NazwiskoManagera,
        constructionData.DataZakonczenia,
        constructionId]);
};

exports.deleteConstruction = (constructionId) => {
    const sql = 'DELETE FROM Budowa where Id = ?';
    return db.promise().execute(sql , [constructionId]);
};
