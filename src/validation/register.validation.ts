import {Joi} from "express-validation";

export const RegisterValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    avatar: Joi.string().email().required(),
    phone: Joi.string().required(),
    full_name: Joi.string().required(),
    email: Joi.string().required(),
    status: Joi.string().required(),
})