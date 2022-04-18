const FirmRepository = require("../repository/mysql2/FirmRepository");
const ConstructionRepository = require('../repository/mysql2/ConstructionRepository');
const FirmEquipmentRepository = require('../repository/mysql2/FirmEquipmentRepository');

exports.showFirmList = (req, res, next) => {
    FirmRepository.getFirms()
        .then(firms =>{
        res.render('pages/firm/list', {
            firms: firms,
            navLocation: 'firm'
        });
    });
};

exports.showAddFirmForm = (req, res, next) => {
    res.render('pages/firm/newFirmForm', {
        firm: { },
        pageTitle: req.__('firm.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('firm.form.add.btnLabel'),
        formAction: '/firms/add',
        navLocation: 'firm',
        validationErrors:[]
    });
};

exports.showFirmDetails = (req, res, next) => {
    const firmId = req.params.firmId;
    let cons, eqs;

    FirmEquipmentRepository.getFirmEquipmentByFirmId(firmId).then(eq => {
        eqs = eq;
        return ConstructionRepository.getConstructionByFirmId(firmId);
    }).then(constructions => {
        cons = constructions;
        return  FirmRepository.getFirmById(firmId);
    }).then(firm => {
        res.render('pages/firm/form', {
            firm: firm,
            pageTitle: req.__('firm.form.details.pageTitle'),
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'firm',
            constructions: cons,
            equipments: eqs,
            validationErrors:[]
        });
    });
};

exports.showEditFirmForm = (req, res, next) => {
    const firmId = req.params.firmId;
    let cons, eqs;


    FirmEquipmentRepository.getFirmEquipmentByFirmId(firmId).then(eq => {
        eqs = eq;
        return ConstructionRepository.getConstructionByFirmId(firmId);
    }).then(constructions => {
        cons = constructions;
        return  FirmRepository.getFirmById(firmId)
    }).then(firm => {
        res.render('pages/firm/form', {
            firm: firm,
            pageTitle: req.__('firm.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('firm.form.edit.btnLabel'),
            formAction: '/firms/edit',
            navLocation: 'firm',
            constructions: cons,
            equipments: eqs,
            validationErrors:[]
        });
    });
};

exports.addFirm = (req, res, next) => {
    const firmData = { ...req.body};

    FirmRepository.createFirm(firmData).then(result => {
        res.redirect('/firms');
    }).catch(err => {
            res.render('pages/firm/newFirmForm', {//form
                firm: firmData,
                pageTitle: req.__('firm.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('firm.form.add.btnLabel'),
                formAction: '/firms/add',
                navLocation: 'firm',
                validationErrors: err.details
            });
        });
};

exports.updateFirm = (req, res, next) => {
    const firmId = req.body.firmId;
    const firm = { ...req.body};

    FirmRepository.updateFirm(firmId, firm).then(result => {
        if (req.session.loggedUser) {
            req.session.loggedUser.Nazwa = firm.Nazwa;
        }

            res.redirect('/firms');

    }).catch(err => {
        const firmeczka = {
            Id: firmId,
            Nazwa: firm.Nazwa,
            Adres: firm.Adres
        }
        let eqs;

        FirmEquipmentRepository.getFirmEquipmentByFirmId(firmId).then(eq => {
            eqs = eq;
            return ConstructionRepository.getConstructionByFirmId(firmId);
        }).then(constructions => {
            res.render('pages/firm/form', {
                firm: firmeczka,
                pageTitle: req.__('firm.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('firm.form.edit.btnLabel'),
                formAction: '/firms/edit',
                navLocation: 'firm',
                constructions: constructions,
                equipments: eqs,
                validationErrors: err.details
            });
        });

    });
};

exports.deleteFirm = (req, res, next) => {
    const firmId = req.params.firmId;
    FirmRepository.deleteFirm(firmId).then( () => {
        res.redirect('/firms');
    });
};

exports.showEditFirmPasswordForm = (req, res, next) => {
    const firmId = req.params.firmId;

    let pas = {
        Id: firmId
    }

    res.render('pages/firm/passwordForm', {
        password: pas,
        pageTitle: req.__('firm.form.edit.password.changePassword'),
        btnLabel: req.__('firm.form.edit.password.changePassword'),
        formAction: '/firms/edit/password',
        navLocation: 'firm',
        validationErrors:[]
    });
};

exports.updateFirmPassword = (req, res, next) => {
    const firmId = req.body.firmId;
    const password = { ...req.body};

    FirmRepository.updateFirmPassword(firmId, password).then(result => {
        if (req.session.admin){
            res.redirect('/firms/edit/' + firmId);
        } else {
            res.redirect('/logout');
        }
    }).catch(err => {
        const heselka = {
            Id: firmId,
            NoweHaslo: password.NoweHaslo,
            PotwierdzHaslo: password.PotwierdzHaslo,
        }

        res.render('pages/firm/passwordForm', {
            password: heselka,
            pageTitle: 'Nowe hasło - do zmiany',
            btnLabel: 'Zmien haslo - do zmiany',
            formAction: '/firms/edit/password',
            navLocation: 'firm',
            validationErrors: err.details
        });
    });
};