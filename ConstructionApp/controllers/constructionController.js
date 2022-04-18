const ConstructionRepository = require('../repository/mysql2/ConstructionRepository');
const FirmRepository = require('../repository/mysql2/FirmRepository');
const EstateRepository = require("../repository/mysql2/EstateRepository");

exports.showConstructionList = (req, res, next) => {
    ConstructionRepository.getConstructions()
        .then(constructions =>{
        res.render('pages/construction/list', {
            constructions: constructions,
            navLocation: 'construction'
        });
    });
};

exports.showAddConstructionForm = (req, res, next) => {
    let allFirms, allEstates;
    FirmRepository.getFirms().then(firms => {
        allFirms = firms;
        return EstateRepository.getEstates();
    }).then(estates => {
        allEstates = estates;
        res.render('pages/construction/form', {
            construction: { },
            pageTitle: req.__('constructions.form.add.pageTitle'),
            allFirms: allFirms,
            allEstates: allEstates,
            formMode: 'createNew',
            btnLabel: req.__('constructions.form.add.btnLabel'),
            formAction: '/constructions/add',
            navLocation: 'construction',
            validationErrors:[]
        });
    });
};

exports.showConstructionDetails = (req, res, next) => {
    const constructionId = req.params.constructionId;
    let allFirms, allEstates;
    FirmRepository.getFirms().then(firms => {
        allFirms = firms;
        return EstateRepository.getEstates();
    }).then(estates => {
        allEstates = estates;
        return ConstructionRepository.getConstructionById(constructionId);
    }).then(construction => {
        if (construction.DataZakonczenia) {
            construction.DataZakonczenia = new Date(construction.DataZakonczenia.getTime() - (construction.DataZakonczenia.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
        }

        res.render('pages/construction/form', {
            construction: construction,
            pageTitle: req.__('constructions.form.details.pageTitle'),
            allFirms: allFirms,
            allEstates: allEstates,
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'construction',
            validationErrors:[]
        });
    });
};

exports.showEditConstructionForm = (req, res, next) => {
    const constructionId = req.params.constructionId;
    let allFirms, allEstates;

    FirmRepository.getFirms().then(firms => {
        allFirms = firms;
        return EstateRepository.getEstates();
    }).then(estates => {
        allEstates = estates;
        return ConstructionRepository.getConstructionById(constructionId);
    }).then(construction => {

        if (construction.DataZakonczenia) {
            construction.DataZakonczenia = new Date(construction.DataZakonczenia.getTime() - (construction.DataZakonczenia.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        }
        res.render('pages/construction/form', {
            construction: construction,
            pageTitle: req.__('constructions.form.edit.pageTitle'),
            allFirms: allFirms,
            allEstates: allEstates,
            formMode: 'edit',
            btnLabel: req.__('constructions.form.edit.pageTitle'),
            formAction: '/constructions/edit',
            navLocation: 'construction',
            validationErrors:[]
        });
    });
};

exports.addConstruction = (req, res, next) => {
    let allFirms, allEstates;
    const constructionData = { ...req.body};

    FirmRepository.getFirms().then(firms => {
        allFirms = firms;
        return EstateRepository.getEstates();
    }).then(estates =>{
        allEstates = estates;
        ConstructionRepository.createConstruction(constructionData).then(result => {
            res.redirect('/constructions');
        }).catch(err => {
            const budowa = {
                Id: '',
                Firma: {
                    Id: constructionData.FId
                },
                Osiedle: {
                    Id: constructionData.OId
                },
                ImieManagera: constructionData.ImieManagera,
                NazwiskoManagera: constructionData.NazwiskoManagera,
                DataZakonczenia: constructionData.DataZakonczenia
            }


            res.render('pages/construction/form', {
                construction: budowa,
                pageTitle: req.__('constructions.form.add.pageTitle'),
                allFirms: allFirms,
                allEstates: allEstates,
                formMode: 'createNew',
                btnLabel: req.__('constructions.form.add.btnLabel'),
                formAction: '/constructions/add',
                navLocation: 'construction',
                validationErrors: err.details
            })
        });
    });
};

exports.updateConstruction = (req, res, next) => {
    let allFirms, allEstates;
    const constructionId = req.body.constructionId;
    const constructionData = { ...req.body};

    FirmRepository.getFirms().then(firms => {
        allFirms = firms;
        return EstateRepository.getEstates();
    }).then(estates => {
        allEstates = estates;
        ConstructionRepository.updateConstruction(constructionId, constructionData).then(result => {
            res.redirect('/constructions');
        }).catch(err => {
                const budowa = {
                    Id: constructionId,
                    ImieManagera: constructionData.ImieManagera,
                    NazwiskoManagera: constructionData.NazwiskoManagera,
                    DataZakonczenia: constructionData.DataZakonczenia,
                    Firma: {
                        Id: constructionData.FId
                    },
                    Osiedle: {
                        Id: constructionData.OId
                    }
                }
                res.render('pages/construction/form', {
                    construction: budowa,
                    pageTitle: req.__('constructions.form.edit.pageTitle'),
                    allFirms: allFirms,
                    allEstates: allEstates,
                    formMode: 'edit',
                    btnLabel: req.__('constructions.form.edit.pageTitle'),
                    formAction: '/constructions/edit',
                    navLocation: 'construction',
                    validationErrors: err.details
                });
        })
    })
};

exports.deleteConstruction = (req, res, next) => {
    const constructionId = req.params.constructionId;
    ConstructionRepository.deleteConstruction(constructionId).then( () => {
        res.redirect('/constructions');
    });
};
