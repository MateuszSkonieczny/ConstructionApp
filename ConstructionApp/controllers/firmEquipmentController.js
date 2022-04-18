const FirmEquipmentRepository = require('../repository/mysql2/FirmEquipmentRepository');
const FirmRepository = require('../repository/mysql2/FirmRepository');
const EquipmentRepository = require('../repository/mysql2/EquipmentRepository');

exports.showFirmEquipmentList = (req, res, next) => {
    FirmEquipmentRepository.getFirmEquipments()
        .then(firmEq =>{
            res.render('pages/firmEquipment/list', {
                firmEquipments: firmEq,
                navLocation: 'firmEquipment'
            });
        });
};

exports.showAddFirmEquipmentForm = (req, res, next) => {
    let allFirms, allEquipments;
    FirmRepository.getFirms().then(firms => {
        allFirms = firms;
        return EquipmentRepository.getEquipments();
    }).then(equipments => {
        allEquipments = equipments;
        res.render('pages/firmEquipment/form', {
            firmEquipment: { },
            pageTitle: req.__('firmEquipments.form.add.pageTitle'),
            allFirms: allFirms,
            allEquipments: allEquipments,
            formMode: 'createNew',
            btnLabel: req.__('firmEquipments.form.add.btnLabel'),
            formAction: '/firmEquipments/add',
            navLocation: 'firmEquipment',
            validationErrors:[]
        });
    });
};

exports.showFirmEquipmentDetails = (req, res, next) => {
    const firmEquipmentId = req.params.firmEquipmentId;
    let allFirms, allEquipments;
    FirmRepository.getFirms().then(firms => {
        allFirms = firms;
        return EquipmentRepository.getEquipments();
    }).then(equipments => {
        allEquipments = equipments;
        return FirmEquipmentRepository.getFirmEquipmentById(firmEquipmentId);
    }).then(firmEquipment => {

        res.render('pages/firmEquipment/form', {
            firmEquipment: firmEquipment,
            pageTitle: req.__('firmEquipments.form.details.pageTitle'),
            allFirms: allFirms,
            allEquipments: allEquipments,
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'firmEquipment',
            validationErrors:[]
        });
    });
};

exports.showEditFirmEquipmentForm = (req, res, next) => {
    const firmEquipmentId = req.params.firmEquipmentId;
    let allFirms, allEquipments;

    FirmRepository.getFirms().then(firms => {
        allFirms = firms;
        return EquipmentRepository.getEquipments();
    }).then(equipments => {
        allEquipments = equipments;
        return FirmEquipmentRepository.getFirmEquipmentById(firmEquipmentId);
    }).then(firmEquipment => {

        res.render('pages/firmEquipment/form', {
            firmEquipment: firmEquipment,
            pageTitle: req.__('firmEquipments.form.edit.pageTitle'),
            allFirms: allFirms,
            allEquipments: allEquipments,
            formMode: 'edit',
            btnLabel: req.__('firmEquipments.form.edit.btnLabel'),
            formAction: '/firmEquipments/edit',
            navLocation: 'firmEquipment',
            validationErrors:[]
        });
    });
};

exports.addFirmEquipment = (req, res, next) => {
    let allFirms, allEquipments;
    const firmEquipmentData = { ...req.body};

    if (firmEquipmentData.Wypozyczone === 'on'){
        firmEquipmentData.Wypozyczone = true;
    } else {
        firmEquipmentData.Wypozyczone = false;
    }

    FirmRepository.getFirms().then(firms => {
        allFirms = firms;
        return EquipmentRepository.getEquipments();
    }).then(equipments =>{
        allEquipments = equipments;
        FirmEquipmentRepository.createFirmEquipment(firmEquipmentData).then(result => {
            res.redirect('/firmEquipments');
        }).catch(err => {
            const feq = {
                Id: '',
                Firma: {
                    Id: firmEquipmentData.FId
                },
                Sprzet: {
                    Id: firmEquipmentData.SId
                },
                Ilosc: firmEquipmentData.Ilosc,
                Wypozyczone: firmEquipmentData.Wypozyczone
            };


            res.render('pages/firmEquipments/form', {
                firmEquipment: feq,
                pageTitle: req.__('firmEquipments.form.add.pageTitle'),
                allFirms: allFirms,
                allEquipments: allEquipments,
                formMode: 'createNew',
                btnLabel: req.__('firmEquipments.form.add.btnLabel'),
                formAction: '/firmEquipments/add',
                navLocation: 'firmEquipment',
                validationErrors: err.details
            })
        });
    });
};


exports.updateFirmEquipment = (req, res, next) => {
    let allFirms, allEquipments;
    const firmEquipmentId = req.body.firmEquipmentId;
    const firmEquipmentData = { ...req.body};

    if (firmEquipmentData.Wypozyczone === 'on'){
        firmEquipmentData.Wypozyczone = true;
    } else {
        firmEquipmentData.Wypozyczone = false;
    }

    FirmRepository.getFirms().then(firms => {
        allFirms = firms;
        return EquipmentRepository.getEquipments();
    }).then(equipments => {
        allEquipments = equipments;
        FirmEquipmentRepository.updateFirmEquipment(firmEquipmentId, firmEquipmentData).then(result => {
            res.redirect('/firmEquipments');
        }).catch(err => {
            const feq = {
                Id: firmEquipmentId,
                Firma: {
                    Id: firmEquipmentData.FId
                },
                Sprzet: {
                    Id: firmEquipmentData.SId
                },
                Ilosc: firmEquipmentData.Ilosc,
                Wypozyczone: firmEquipmentData.Wypozyczone
            };

            res.render('pages/firmEquipments/form', {
                firmEquipment: feq,
                pageTitle: req.__('firmEquipments.form.edit.pageTitle'),
                allFirms: allFirms,
                allEquipments: allEquipments,
                formMode: 'edit',
                btnLabel: req.__('firmEquipments.form.edit.btnLabel'),
                formAction: '/firmEquipments/edit',
                navLocation: 'firmEquipment',
                validationErrors: err.details
            });
        })
    })
};

exports.deleteFirmEquipment = (req, res, next) => {
    const firmEquipmentId = req.params.firmEquipmentId;
    FirmEquipmentRepository.deleteFirmEquipment(firmEquipmentId).then( () => {
        res.redirect('/firmEquipments');
    });
};
