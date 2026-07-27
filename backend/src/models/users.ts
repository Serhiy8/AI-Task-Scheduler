import Joi from "joi";
import { Request } from "express";

interface User {
  user_id: string;
  created_at: string;
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface Task {
  user_id: string;
  title: string;
  description: string;
  status: boolean;
}

export interface RequestU extends Request {
  user?: User;
}

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

export const createTaskSchema = Joi.object<Task>({
  user_id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Boolean,
});
