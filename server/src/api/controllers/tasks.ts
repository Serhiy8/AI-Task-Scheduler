import { NextFunction, Request, Response } from "express";
import { addTaskSB, getTasksSB, removeTaskSB } from "../../supabase/supabaseTable";
import { RequestU } from "../../models/users";
import { httpError } from "../../utils/utils";

export const getTasks = async (
  req: RequestU,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return next(httpError(401, "Bad request"));
  }
  const { user_id: id } = req.user;
  const data = await getTasksSB(id);

  res.json(data);
};

export const createTask = async (
  req: RequestU,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, status = false } = req.body;

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

export const removeTask = async (
  req: RequestU,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.params;
  if (!_id) {
    return next(httpError(400, "Bad request"));
  }
  console.log("Task ID to remove:", _id);
  const result = await removeTaskSB(_id as string);
  if(!result) {
    return next(httpError(404, "Task not found"));
  }
  console.log(result)
  res.json({ task_id: _id, message: "Task removed successfully" });
};

// id: string;
//   user_id: string;
//   title: string;
//   description: string;
//   status: boolean;
