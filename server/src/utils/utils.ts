import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getUserById } from "../supabase/supabaseUser";
import { RequestU } from "../models/users";

interface HttpError extends Error {
  status: number;
}

interface TokenPayload extends JwtPayload {
  id: string;
}

const { JWT_SECRET } = process.env;

export const httpError = (status: number, message: string): HttpError => {
  const error = new Error(message) as HttpError;
  error.status = status;
  return error;
};

export const createHashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const comparePassword = async (password: string, hashPassword: string) =>
  await bcrypt.compare(password, hashPassword);

export const authenticate = async (
  req: RequestU,
  res: Response,
  next: NextFunction,
) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(httpError(401, "Bad request"));
    return;
  }

  try {
    if (!JWT_SECRET || !token) {
      next(httpError(500, "Server error!"));
      return;
    }
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;

    const { id } = payload;

    const user = await getUserById(id);
    console.log(user)

    if (!user.success) {
      next(httpError(401, "Unauthorized"));
      return;
    }

    req.user = user.data;

    next();
  } catch (error) {
    next(httpError(401, "Bad request"));
  }
};

export const createToken = (payload: TokenPayload, next: NextFunction) => {
  try {
    if (!JWT_SECRET) {
      throw httpError(500, "Internal Server Error");
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  } catch (error) {
    next(httpError(401, "Bad request"));
  }
};

