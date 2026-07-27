import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { loginSchema, registerSchema } from "../../models/users";
import { loginSB, registerSB } from "../../supabase/supabaseUser";
import {
  comparePassword,
  createHashPassword,
  createToken,
  httpError,
} from "../../utils/utils";
import { nanoid } from "nanoid";

// REGISTER Function

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const { name, email, password } = req.body;
    const hashPassword = await createHashPassword(password);
    const user = {
      user_id: nanoid(),
      name: name,
      email: email,
      password: hashPassword,
    };
    const result = await registerSB(user);

    if (!result.success) {
      throw httpError(result.status, result.error.message);
    }

    const payload = {
      id: result.data.user_id,
    };

    const token = createToken(payload, next);

    res.status(result.status).json({
      name,
      email,
      token,
    });
  } catch (error) {
    next(error);
  }
}

// LOGIN Function

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const { email, password } = req.body;
    const user = await loginSB(email);

    if (!user.success) {
      throw httpError(401, "Invalid email or password");
    }

    const comparePasswordResult = await comparePassword(
      password,
      user.data.password,
    );

    if (!comparePasswordResult) {
      throw httpError(401, "Invalid email or password");
    }

    const payload = {
      id: user.data.user_id,
    };

    const token = createToken(payload, next);

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
}
