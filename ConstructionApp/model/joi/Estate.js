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
            case "number.min":
                err.message = `Pole powinno zawierać licbę większą niż 0`;
                break;
            case "number.max":
                err.message = `Pole powinno zawierać licbę mniejszą niż 51`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const estateSchema = Joi.object({
    estateId: Joi.number()
        .optional()
        .allow(""),
    Adres: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    LiczbaBudynkow: Joi.number()
        .min(1)
        .max(50)
        .required()
        .error(errMessages)
});
module.exports = estateSchema;