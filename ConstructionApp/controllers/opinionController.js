const OpinionRepository = require('../repository/mysql2/OpinionRepository');

exports.showOpinions = (req, res, next) => {
    const firmId = req.params.firmId;
    OpinionRepository.getFirmOpinios(firmId)
        .then(opinions =>{
            res.render('pages/opinion/list', {
                id: firmId,
                opinions: opinions,
                navLocation: 'firm',
                opinion: {},
                pageTitle: req.__('opinion.form.add.pageTitle'),
                btnLabel: req.__('opinion.form.add.btnLabel'),
                formAction: '/opinions/add',
                validationErrors:[]
            });
        });
};

exports.addOpinion = (req, res, next) => {
    const opinionData = { ...req.body};
    const firmId = opinionData.firmId;
    let opinions;

    OpinionRepository.getFirmOpinios(firmId).then(op => {
        opinions = op;
        return OpinionRepository.addOpinion(opinionData)
    }).then(result => {
        res.redirect('/opinions/' + firmId);
    }).catch(err => {
        res.render('pages/opinion/list', {
            id: firmId,
            opinions: opinions,
            opinion: opinionData,
            pageTitle: req.__('opinion.form.add.pageTitle'),
            btnLabel: req.__('opinion.form.add.btnLabel'),
            formAction: '/opinions/add',
            navLocation: 'firm',
            validationErrors: err.details
        });
    });
};
