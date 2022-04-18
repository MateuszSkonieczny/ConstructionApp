const FirmEquipmentRepository = require('../repository/mysql2/FirmEquipmentRepository');

exports.getFirmEquipments = (req, res, next) => {
    FirmEquipmentRepository.getFirmEquipments().then(eq => {
        res.status(200).json(eq);
    }).catch(err => {
        console.log(err);
    });
};

exports.getFirmEquipmentById = (req, res, next) => {
    const firmEquipmentId = req.params.firmEquipmentId;
    FirmEquipmentRepository.getFirmEquipmentById(firmEquipmentId).then(firm => {
        if (!firm){
            res.status(404).json({
                message: ' FirmEquipment with id: '+firmEquipmentId+' not found'
            })
        } else {
            res.status(200).json(firm);
        }
    });
};

exports.createFirmEquipment = (req, res, next) => {
    FirmEquipmentRepository.createFirmEquipment(req.body).then(newFirmEquipment => {
        res.status(201).json(newFirmEquipment);
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateFirmEquipment = (req, res, next) => {
    const firmEquipmentId = req.params.firmEquipmentId;
    FirmEquipmentRepository.updateFirmEquipment(firmEquipmentId, req.body).then(result => {
        res.status(200).json({message: 'FirmEquipment updated!', firmEquipment: result});
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteFirmEquipment = (req, res, next) => {
    const firmEquipmentId = req.params.firmEquipmentId;
    FirmEquipmentRepository.deleteFirmEquipment(firmEquipmentId).then(result => {
        res.status(200).json({message: 'Removed FirmEquipment', equipment: result});
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};
