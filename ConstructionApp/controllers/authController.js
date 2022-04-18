const FirmRepository = require("../repository/mysql2/FirmRepository");
const authUtil = require("../util/authUtils");

exports.login = (req, res, next) => {
    const nazwa = req.body.Nazwa;
    const password = req.body.password;
    if (!nazwa || !password){
        res.render('index', {
            navLocation: '',
            loginError: req.__('auth.form.incorrect')
        })
    }else {
        FirmRepository.getFirmByName(nazwa).then(firm => {
            if (!firm){
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('auth.form.incorrect')
                })
            } else if (authUtil.comparePasswords(password, firm.password) === true) {

                if (firm.Nazwa === 'admin' && !firm.Adres){
                    req.session.admin = firm;
                } else {
                    req.session.loggedUser = firm;
                }
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('auth.form.incorrect')
                })
            }
        }).catch(err => {
            console.log(err);
        });
    }



}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    req.session.admin = undefined;
    res.redirect('/');
}