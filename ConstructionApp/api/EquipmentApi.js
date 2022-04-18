const EquipmentRepository = require('../repository/mysql2/EquipmentRepository');

exports.getEquipments = (req, res, next) => {
    EquipmentRepository.getEquipments().then(eq => {
        res.status(200).json(eq);
    }).catch(err => {
        console.log(err);
    });
};

exports.getEquipmentById = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    EquipmentRepository.getEquipmentById(equipmentId).then(firm => {
        if (!firm){
            res.status(404).json({
                message: 'Firm with id: '+equipmentId+' not found'
            })
        } else {
            res.status(200).json(firm);
        }
    });
};

exports.createEquipment = (req, res, next) => {
    EquipmentRepository.createEquipment(req.body).then(newEquipment => {
        res.status(201).json(newEquipment);
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    EquipmentRepository.updateEquipment(equipmentId, req.body).then(result => {
        res.status(200).json({message: 'Equipment updated!', firm: result});
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    EquipmentRepository.deleteEquipment(equipmentId).then(result => {
        res.status(200).json({message: 'Removed equipment', equipment: result});
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};
