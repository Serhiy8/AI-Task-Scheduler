import express from "express";
import {
  createTask,
  getTaskById,
  getTasks,
  removeTask,
  updateTask,
} from "../controllers/tasks";
import { authenticate } from "../../utils/utils";
import { createTaskAI } from "../controllers/aiController";

export const tasksRouter = express.Router();

tasksRouter.get("/", authenticate, getTasks);
tasksRouter.post("/", authenticate, createTask);
tasksRouter.patch("/", authenticate, updateTask);
tasksRouter.delete("/:_id", authenticate, removeTask);
tasksRouter.get("/:_id", authenticate, getTaskById);
tasksRouter.post("/ai", authenticate, createTaskAI);
