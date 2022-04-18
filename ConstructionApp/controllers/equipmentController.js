const EquipmentRepository = require("../repository/mysql2/EquipmentRepository");
const FirmEquipmentRepository = require("../repository/mysql2/FirmEquipmentRepository");

exports.showEquipmentList = (req, res, next) => {
    EquipmentRepository.getEquipments()
        .then(equipments =>{
            res.render('pages/equipment/list', {
                equipments: equipments,
                navLocation: 'equipment'
            });
        });
};

exports.showAddEquipmentForm = (req, res, next) => {
    res.render('pages/equipment/form', {
        equipment: { },
        pageTitle: req.__('equipment.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('equipment.form.add.btnLabel'),
        formAction: '/equipments/add',
        navLocation: 'equipment',
        validationErrors:[]
    });
};

exports.showEquipmentDetails = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    let feq;

    FirmEquipmentRepository.getFirmEquipmentByEquipmentId(equipmentId).then(firmEq => {
        feq = firmEq;
        return EquipmentRepository.getEquipmentById(equipmentId)
    }).then(equipment => {
        res.render('pages/equipment/form', {
            equipment: equipment,
            pageTitle: req.__('equipment.form.details.pageTitle'),
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'equipment',
            firmEquipments: feq,
            validationErrors:[]
        });
    });
}

exports.showEditEquipmentForm = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    let feq;

    FirmEquipmentRepository.getFirmEquipmentByEquipmentId(equipmentId).then(firmEq => {
        feq = firmEq;
        return EquipmentRepository.getEquipmentById(equipmentId)
    }).then(equipment => {
        res.render('pages/equipment/form', {
            equipment: equipment,
            pageTitle: req.__('equipment.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('equipment.form.edit.btnLabel'),
            formAction: '/equipments/edit',
            navLocation: 'equipment',
            firmEquipments: feq,
            validationErrors:[]
        });
    });
};

exports.addEquipment = (req, res, next) => {
    const equipmentData = { ...req.body};

    if (equipmentData.SprzetCiezki === 'on'){
        equipmentData.SprzetCiezki = true;
    } else {
        equipmentData.SprzetCiezki = false;
    }

    EquipmentRepository.createEquipment(equipmentData).then(result => {
        res.redirect('/equipments');
    }).catch(err => {
        res.render('pages/equipment/form', {
            equipment: equipmentData,
            pageTitle: req.__('equipment.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('equipment.form.add.btnLabel'),
            formAction: '/equipments/add',
            navLocation: 'equipment',
            validationErrors: err.details
        })
    });
};

exports.updateEquipment = (req, res, next) => {
    const equipmentId = req.body.equipmentId;
    const equipmentData = { ...req.body};

    if (equipmentData.SprzetCiezki === 'on'){
        equipmentData.SprzetCiezki = true;
    } else {
        equipmentData.SprzetCiezki = false;
    }

    EquipmentRepository.updateEquipment(equipmentId, equipmentData).then(result => {
        res.redirect('/equipments');
    }).catch(err => {
        const eq = {
            Id: equipmentId,
            Nazwa: equipmentData.Nazwa,
            SprzetCiezki: equipmentData.SprzetCiezki
        }


        FirmEquipmentRepository.getFirmEquipmentByEquipmentId(equipmentId).then(firmEq => {
            res.render('pages/equipment/form', {
                equipment: eq,
                pageTitle: req.__('equipment.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('equipment.form.edit.btnLabel'),
                formAction: '/equipments/edit',
                navLocation: 'equipment',
                firmEquipments: firmEq,
                validationErrors: err.details
            })
        })
    })
};

exports.deleteEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    EquipmentRepository.deleteEquipment(equipmentId).then( () => {
        res.redirect('/equipments');
    });
};
