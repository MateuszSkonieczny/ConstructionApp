const FirmRepository = require("../repository/mysql2/FirmRepository");

exports.showEditAdminPasswordForm = (req, res, next) => {
    res.render('pages/admin/passwordForm', {
        password: {},
        pageTitle: req.__('admin.form.newPassword'),
        btnLabel: req.__('admin.form.changePassword'),
        formAction: '/admin/edit/password',
        navLocation: '',
        validationErrors:[]
    });
};

exports.updateAdminPassword = (req, res, next) => {
    let password = { ...req.body};
    password = {
        firmId: 1,
        NoweHaslo: password.NoweHaslo,
        PotwierdzHaslo: password.PotwierdzHaslo
    }

    FirmRepository.updateFirmPassword(1, password).then(result => {
        res.redirect('/logout');
    }).catch(err => {
        const haselka = {
            Id: 1,
            NoweHaslo: password.NoweHaslo,
            PotwierdzHaslo: password.PotwierdzHaslo
        }

        res.render('pages/admin/passwordForm', {
            password: haselka,
            pageTitle: req.__('admin.form.newPassword'),
            btnLabel: req.__('admin.form.changePassword'),
            formAction: '/admin/edit/password',
            navLocation: '',
            validationErrors: err.details
        });
    });
};