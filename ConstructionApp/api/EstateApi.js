const EstateRepository = require('../repository/mysql2/EstateRepository');

exports.getEstates = (req, res, next) => {
    EstateRepository.getEstates().then(estate => {
        res.status(200).json(estate);
    }).catch(err => {
        console.log(err);
    });
};

exports.getEstateById = (req, res, next) => {
    const estateId = req.params.estateId;
    EstateRepository.getEstatebyId(estateId).then(estate => {
        if (!estate){
            res.status(404).json({
                message: 'Estate with id: '+estateId+' not found'
            })
        } else {
            res.status(200).json(estate);
        }
    });
};

exports.createEstate = (req, res, next) => {
    EstateRepository.createEstate(req.body).then(newEstate => {
        res.status(201).json(newEstate);
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateEstate = (req, res, next) => {
    const estateId = req.params.estateId;
    EstateRepository.updateEstate(estateId, req.body).then(result => {
        res.status(200).json({message: 'Estate updated!', estate: result});
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteEstate = (req, res, next) => {
    const estateId = req.params.estateId;
    EstateRepository.deleteEstate(estateId).then(result => {
        res.status(200).json({message: 'Removed estate', estate: result});
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};