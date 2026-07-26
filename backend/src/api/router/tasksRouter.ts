import express from "express";
import { createTask, getTasks } from "../controllers/tasks";
import { authenticate } from "../../utils/utils";

export const tasksRouter = express.Router();

tasksRouter.get("/tasks", authenticate, getTasks);
tasksRouter.post("/tasks",  createTask);
