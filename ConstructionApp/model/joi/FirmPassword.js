const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            default:
                break;
        }
    });
    return errors;
};

const firmPasswordSchema = Joi.object({
    firmId: Joi.number()
        .required(),
    NoweHaslo: Joi.string()
        .required()
        .error(errMessages),
    PotwierdzHaslo: Joi.string()
        .required()
        .error(errMessages)
});

module.exports = firmPasswordSchema;
