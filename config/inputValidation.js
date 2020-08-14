const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().min(4).required(),
        role: Joi.string()
    });
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
}

const itemValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().required(),
        quantity: Joi.number().required()
    });
    return schema.validate(data);
}

module.exports = {registerValidation, loginValidation, itemValidation}