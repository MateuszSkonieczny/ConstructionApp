const EstateRepository = require("../repository/mysql2/EstateRepository");
const ConstructionRepository = require("../repository/mysql2/ConstructionRepository");

exports.showEstateList = (req, res, next) => {
    EstateRepository.getEstates()
        .then(estates =>{
        res.render('pages/estate/list', {
            estates: estates,
            navLocation: 'estate'
        });
    });
};

exports.showAddEstateForm = (req, res, next) => {
    res.render('pages/estate/form', {
        estate: { },
        pageTitle: req.__('estate.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('estate.form.add.btnLabel'),
        formAction: '/estates/add',
        navLocation: 'estate',
        validationErrors:[]
    });
};

exports.showEstateDetails = (req, res, next) => {
    const estateId = req.params.estateId;
    let cons;

    ConstructionRepository.getConstructionByEstateId(estateId).then(constructions => {
        cons = constructions;
        return EstateRepository.getEstatebyId(estateId)
    }).then(estate => {
        res.render('pages/estate/form', {
            estate: estate,
            pageTitle: req.__('estate.form.details.pageTitle'),
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'estate',
            constructions: cons,
            validationErrors:[]
        });
    });
}

exports.showEditEstateForm = (req, res, next) => {
    const estateId = req.params.estateId;
    let cons;

    ConstructionRepository.getConstructionByEstateId(estateId).then(constructions => {
        cons = constructions;
        return EstateRepository.getEstatebyId(estateId)
    }).then(estate => {
        res.render('pages/estate/form', {
            estate: estate,
            pageTitle: req.__('estate.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('estate.form.edit.btnLabel'),
            formAction: '/estates/edit',
            navLocation: 'estate',
            constructions: cons,
            validationErrors:[]
        });
    });
};

exports.addEstate = (req, res, next) => {
    const estateData = { ...req.body};

    EstateRepository.createEstate(estateData).then(result => {
        res.redirect('/estates');
    }).catch(err => {
        res.render('pages/estate/form', {
            estate: estateData,
            pageTitle: req.__('estate.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('estate.form.add.btnLabel'),
            formAction: '/estates/add',
            navLocation: 'estate',
            validationErrors: err.details
        })
    });
};

exports.updateEstate = (req, res, next) => {
    const estateId = req.body.estateId;
    const estateData = { ...req.body};
    EstateRepository.updateEstate(estateId, estateData).then(result => {
        res.redirect('/estates');
    }).catch(err => {
        const osiedle = {
            Id: estateId,
            Adres: estateData.Adres,
            LiczbaBudynkow: estateData.LiczbaBudynkow
        }


        ConstructionRepository.getConstructionByEstateId(estateId).then(constructions => {
            res.render('pages/estate/form', {
                estate: osiedle,
                pageTitle: req.__('estate.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('estate.form.edit.btnLabel'),
                formAction: '/estates/edit',
                navLocation: 'estate',
                constructions: constructions,
                validationErrors: err.details
            })
        })


    })
};

exports.deleteEstate = (req, res, next) => {
    const estateId = req.params.estateId;
    EstateRepository.deleteEstate(estateId).then( () => {
        res.redirect('/estates');
    });
};
