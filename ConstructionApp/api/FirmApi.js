const FirmRepository = require('../repository/mysql2/FirmRepository');

exports.getFirms = (req, res, next) => {
    FirmRepository.getFirms().then(firms => {
        res.status(200).json(firms);
    }).catch(err => {
        console.log(err);
    });
};

exports.getFirmById = (req, res, next) => {
    const firmId = req.params.firmId;
    FirmRepository.getFirmById(firmId).then(firm => {
        if (!firm){
            res.status(404).json({
                message: 'Firm with id: '+firmId+' not found'
            })
        } else {
            res.status(200).json(firm);
        }
    });
};

exports.createFirm = (req, res, next) => {
  FirmRepository.createFirm(req.body).then(newFirm => {
      res.status(201).json(newFirm);
  }).catch(err => {
      if(!err.statusCode){
          err.statusCode = 500;
      }
      next(err);
  });
};

exports.updateFirm = (req, res, next) => {
    const firmId = req.params.firmId;
    FirmRepository.updateFirm(firmId, req.body).then(result => {
        res.status(200).json({message: 'Firm updated!', firm: result});
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteFirm = (req, res, next) => {
    const firmId = req.params.firmId;
    FirmRepository.deleteFirm(firmId).then(result => {
        res.status(200).json({message: 'Removed firm', firm: result});
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};