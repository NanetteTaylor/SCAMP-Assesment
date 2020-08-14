const Joi = require('@hapi/joi');

const registerValidation = data => {
    const registerInputRules = Joi.object({
        username: Joi.string().min(4).required(),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().min(4).required(),
        role: Joi.string()
    });
    return registerInputRules.validate(data);
}

const loginValidation = data => {
    const loginInputRules = Joi.object({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().min(4).required()
    });
    return loginInputRules.validate(data);
}

module.exports = {registerValidation, loginValidation}