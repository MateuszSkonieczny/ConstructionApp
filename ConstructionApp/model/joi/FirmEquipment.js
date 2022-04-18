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
            default:
                break;
        }
    });
    return errors;
}

const firmEquipmentSchema = Joi.object({
    firmEquipmentId: Joi.number()
        .optional()
        .allow(""),
    FId: Joi.number()
        .required()
        .error(errMessages),
    SId: Joi.number()
        .required()
        .error(errMessages),
    Ilosc: Joi.number()
        .required()
        .error(errMessages),
    Wypozyczone: Joi.bool()
        .error(errMessages)
})

module.exports = firmEquipmentSchema;