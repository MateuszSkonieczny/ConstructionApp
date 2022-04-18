const constructionRepository = require('../repository/mysql2/ConstructionRepository');

exports.getConstructions = (req, res, next) => {
    constructionRepository.getConstructions().then(construction => {
        res.status(200).json(construction);
    }).catch(err => {
        console.log(err);
    });
};

exports.getConstructionById = (req, res, next) => {
    const constructionId = req.params.constructionId;
    constructionRepository.getConstructionById(constructionId).then(construction => {
        if (!construction){
            res.status(404).json({
                message: 'Construction with id: '+constructionId+' not found'
            })
        } else {
            res.status(200).json(construction);
        }
    });
};

exports.createConstruction = (req, res, next) => {
    constructionRepository.createConstruction(req.body).then(newConstruction => {
        res.status(201).json(newConstruction);
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateConstruction = (req, res, next) => {
    const constructionId = req.params.constructionId;
    constructionRepository.updateConstruction(constructionId, req.body).then(result => {
        res.status(200).json({message: 'Construction updated!', construction: result});
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteConstruction = (req, res, next) => {
    const constructionId = req.params.constructionId;
    constructionRepository.deleteConstruction(constructionId).then(result => {
        res.status(200).json({message: 'Removed construction', construction: result});
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};