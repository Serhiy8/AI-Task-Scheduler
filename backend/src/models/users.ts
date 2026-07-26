import Joi from "joi";

export interface registerUser {
  name: string;
  email: string;
  password: string;
}

export interface loginUser {
  email: string;
  password: string;
}

export const registerSchema = Joi.object<registerUser>({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(7).required(),
});

export const loginSchema = Joi.object<loginUser>({
  email: Joi.string().required(),
  password: Joi.string().min(7).required(),
});
