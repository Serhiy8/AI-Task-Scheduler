import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { loginSchema, registerSchema, RequestU } from "../../models/users";
import {
  addTokenSB,
  loginSB,
  registerSB,
  removeToken,
} from "../../supabase/supabaseUser";
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

    const userId = result.data.user_id;

    const payload = {
      id: userId,
    };

    const token = createToken(payload, next);
    const addToken = await addTokenSB(userId, token || "52");
    console.log(addToken);

    res.status(result.status).json({
      userId,
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
    const { email, password: passworsRow } = req.body;
    const user = await loginSB(email);

    if (!user.success) {
      throw httpError(401, "Invalid email or password");
    }

    const comparePasswordResult = await comparePassword(
      passworsRow,
      user.data.password,
    );

    if (!comparePasswordResult) {
      throw httpError(401, "Invalid email or password");
    }

    const payload = {
      id: user.data.user_id,
    };

    const token = createToken(payload, next);

    const { password, ...dataWithoutPassword } = user.data;

    res.json({
      user: dataWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCurrent(
  req: RequestU,
  res: Response,
  next: NextFunction,
): Promise<void> {
  res.json(req.user);
}

export async function loguot(
  req: RequestU,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.user?.user_id) {
    return next(httpError(401, "Unauthorized"));
  }
  const { user_id } = req.user;
  const result = await removeToken(user_id);
  res.json({
    result,
  });
}
