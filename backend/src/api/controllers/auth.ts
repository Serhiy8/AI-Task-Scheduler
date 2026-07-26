import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { loginSchema, registerSchema } from "../../models/users";
import { loginSB, registerSB } from "../../supabase/supabaseUser";
import {
  comparePassword,
  createHashPassword,
  httpError,
} from "../../utils/utils";
import { nanoid } from "nanoid";

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

    res.status(result.status).json({
      name,
      email,
    });
  } catch (error) {
    next(error);
  }
}

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

    console.log(user);

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

    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
      throw httpError(500, "Internal Server Error");
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
}
