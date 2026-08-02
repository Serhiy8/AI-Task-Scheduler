import express from "express";
import { createTask, getTasks, removeTask } from "../controllers/tasks";
import { authenticate } from "../../utils/utils";
import { createTaskAI } from "../controllers/aiController";

export const tasksRouter = express.Router();

tasksRouter.get("/", authenticate, getTasks);
tasksRouter.post("/", authenticate, createTask);
tasksRouter.delete("/:_id", authenticate, removeTask);
tasksRouter.post("/ai", authenticate, createTaskAI);
