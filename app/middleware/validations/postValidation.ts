import { Joi } from "express-validation";

const rules = {
    create: {
        body: Joi.object({
            title: Joi.string()
                .alphanum()
                .min(3)
                .max(50)
                .required(),
            description: Joi.string()
                .alphanum()
                .min(3)
                .max(200)
                .required()
        })
    },
    update: {
        body: Joi.object({
            title: Joi.string()
                .alphanum()
                .min(3)
                .max(50)
                .required(),
            description: Joi.string()
                .alphanum()
                .min(3)
                .max(200)
                .required()
        })
    },
};

export default {
    rules,
};
