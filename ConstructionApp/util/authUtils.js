const bcrypt = require('bcryptjs');
const ConstructionRepository = require('../repository/mysql2/ConstructionRepository');
const FirmRepository = require('../repository/mysql2/FirmRepository');
const FirmEquipmentRepository = require('../repository/mysql2/FirmEquipmentRepository');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    const admin = req.session.admin;
    if (loggedUser || admin){
        next();
    } else {
        throw new Error('unauthorized access');
    }
};

exports.permitAuthenticatedUserConstruction = (req, res, next) => {
    const constructionId = req.params.constructionId;
    const loggedUser = req.session.loggedUser;
    const admin = req.session.admin;

    ConstructionRepository.getConstructionById(constructionId).then(construction => {
        if (admin || (loggedUser && loggedUser.Id === construction.Firma.Id)){
            next();
        } else {
            throw new Error('unauthorized access');
        }
    });
};

exports.permitAuthenticatedUserFirm = (req, res, next) => {
    let firmId = req.params.firmId;
    const loggedUser = req.session.loggedUser;
    const admin = req.session.admin;
    if (loggedUser && firmId === undefined){
        firmId = loggedUser.Id;
    }

    if (!loggedUser && ! admin) {
        throw new Error('unauthorized access');
    }

    FirmRepository.getFirmById(firmId).then(firm => {
        if (admin || (loggedUser && loggedUser.Id === firm.Id)){
            if (firmId === 1){
                throw new Error('unauthorized access');
            } else {
                next();
            }

        } else {
            throw new Error('unauthorized access');
        }
    });
};

exports.permitAdmin = (req, res, next) => {
    const firmId = req.params.firmId;
    if (firmId === 1){
        throw new Error('unauthorized access');
    } else {
        next();
    }
};

exports.permitAuthenticatedUserFirmEquipment = (req, res, next) => {
    const firmEquipmentId = req.params.firmEquipmentId;
    const loggedUser = req.session.loggedUser;
    const admin = req.session.admin;

    FirmEquipmentRepository.getFirmEquipmentById(firmEquipmentId).then(feq => {
        if (admin || (loggedUser && loggedUser.Id === feq.Firma.Id)){
            next();
        } else {
            throw new Error('unauthorized access');
        }
    });
};


exports.permitAuthenticatedAdmin = (req, res, next) => {
    const admin = req.session.admin;
    if (admin){
        next();
    } else {
        throw new Error('unauthorized access');
    }
};