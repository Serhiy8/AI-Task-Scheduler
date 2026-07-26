import { NextFunction, Request, Response } from "express";
import { addTaskSB, getTasksSB } from "../../supabase/supabaseTable";
import { RequestU } from "../../models/users";
import { httpError } from "../../utils/utils";

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = await getTasksSB();

  res.json(data);
};

export const createTask = async (
  req: RequestU,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, status } = req.body;

  if (!req.user) {
    return httpError(401, "Not authorized");
  }
  const { user_id } = req.user;
  const newTask = {
    user_id,
    title,
    description,
    status,
  };
  const result = await addTaskSB(newTask);
  res.json(result);
};

// id: string;
//   user_id: string;
//   title: string;
//   description: string;
//   status: boolean;
