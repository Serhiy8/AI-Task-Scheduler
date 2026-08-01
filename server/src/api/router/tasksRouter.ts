import express from "express";
import { createTask, getTasks } from "../controllers/tasks";
import { authenticate } from "../../utils/utils";
import { createTaskAI } from "../controllers/aiController";

export const tasksRouter = express.Router();

tasksRouter.get("/", authenticate, getTasks);
tasksRouter.post("/", authenticate, createTask);
tasksRouter.post("/ai", authenticate, createTaskAI);
