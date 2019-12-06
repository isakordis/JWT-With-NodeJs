const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema =
    {

        name: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .min(3)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };

    return Joi.valid(data, schema)
}

const loginValidation = data => {
    const schema =
    {
        email: Joi.string()
            .min(3)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };

    return Joi.valid(data, schema)
}

module.exports.registerValidation=registerValidation;
module.exports.registerValidation=loginValidation;
