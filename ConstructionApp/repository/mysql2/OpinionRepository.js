const db = require('../../config/mysql2/db');
const opinionSchema = require('../../model/joi/Opinion');
const Console = require("console");

exports.getFirmOpinios = (firmId) => {
    sql = `SELECT o.Id, o.FId, o.Tresc 
            FROM Opinia o
            join Firma f on o.FId = f.Id
            where o.FId = ?`;

    return db.promise().query(sql, firmId).then( (results, fields) => {
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.addOpinion = (newOpinionData) => {
    const vRes = opinionSchema.validate(newOpinionData, { abortEarly: false });
    if (vRes.error){
        return Promise.reject(vRes.error);
    }

    const FId = newOpinionData.firmId;
    const Tresc = newOpinionData.Tresc;

    const sql = 'INSERT into Opinia (FId, Tresc) VALUES (?, ?)';
    return db.promise().execute(sql, [FId, Tresc]);
};




