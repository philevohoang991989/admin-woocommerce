import {Joi} from "express-validation";

export const RegisterValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    avatar: Joi.string(),
    phone: Joi.string().required(),
    full_name: Joi.string().required(),
    email: Joi.string().required(),
})