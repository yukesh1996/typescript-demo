import { Joi } from "express-validation";

const rules = {
    register: {
        body: Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(10)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            phone: Joi.number().required()
        })
    },
    login: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        }),
    },
};

export default {
    rules,
};
