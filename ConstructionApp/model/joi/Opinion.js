const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
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

const opinionSchema = Joi.object({
    firmId: Joi.number()
        .optional()
        .allow(""),
    Tresc: Joi.string()
        .max(255)
        .required()
        .error(errMessages)
});

module.exports = opinionSchema;
