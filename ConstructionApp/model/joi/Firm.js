const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaków`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaków`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const firmSchema = Joi.object({
    firmId: Joi.number()
        .optional()
        .allow(""),
    Nazwa: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    Adres: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages)
});
module.exports = firmSchema;