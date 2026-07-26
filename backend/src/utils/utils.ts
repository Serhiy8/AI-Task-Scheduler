import bcrypt from "bcrypt";

interface HttpError extends Error {
  status: number;
}

export const httpError = (status: number, message: string): HttpError => {
  const error = new Error(message) as HttpError;
  error.status = status;
  return error;
};

export const createHashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const comparePassword = async (password: string, hashPassword: string) =>
  await bcrypt.compare(password, hashPassword);


