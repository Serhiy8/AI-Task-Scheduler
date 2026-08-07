import { NextFunction, Request, Response } from "express";
import {
  addTaskSB,
  getTasksByIdSB,
  getTasksSB,
  removeTaskSB,
  updateTaskSB,
} from "../../supabase/supabaseTable";
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
  const { title, description, status = false, priority = "Low" } = req.body;

  if (!req.user) {
    return next(httpError(401, "Not authorized"));
  }
  const { user_id } = req.user;
  const newTask = {
    user_id,
    title,
    description,
    status,
    priority,
  };
  const result = await addTaskSB(newTask);
  res.json(result);
};

export const getTaskById = async (
  req: RequestU,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.params;

  if (!req.user) {
    return next(httpError(401, "Not authorized"));
  }
  const { user_id } = req.user;
  if (!_id) {
    return next(httpError(400, "Bad request"));
  }
  const result = await getTasksByIdSB(_id as string);

  if (!Array.isArray(result) || result.length === 0) {
    return next(httpError(404, "Task not found"));
  }

  const task = result[0];
  if (user_id !== task.user_id) {
    return next(httpError(403, "Forbidden"));
  }

  res.json(task);
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

  const result = await removeTaskSB(_id as string);
  if (!result) {
    return next(httpError(404, "Task not found"));
  }
  res.json({ task_id: _id, message: "Task removed successfully" });
};

export const updateTask = async (
  req: RequestU,
  res: Response,
  next: NextFunction,
) => {
  const result = await updateTaskSB(req.body);
  console.log(result);
  if (!result) {
    return next(httpError(404, "Task not found"));
  }
  res.json(result);
};

