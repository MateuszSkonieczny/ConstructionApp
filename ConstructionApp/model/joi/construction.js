const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "number.base":
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

const constructionSchema = Joi.object({
    constructionId: Joi.number()
        .optional()
        .allow(""),
    FId: Joi.number()
        .required()
        .error(errMessages),
    OId: Joi.number()
        .required()
        .error(errMessages),
    ImieManagera: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    NazwiskoManagera: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    DataZakonczenia: Joi.date()
        .optional()
        .allow("")
});
module.exports = constructionSchema;