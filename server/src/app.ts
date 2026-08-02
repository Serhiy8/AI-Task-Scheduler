import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { userRouter } from "./api/router/userRouter";
import { tasksRouter } from "./api/router/tasksRouter";
import { authenticate } from "./utils/utils";
import { createTaskAI } from "./api/controllers/aiController";

interface AppError extends Error {
  status?: number;
}

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://твій-frontend.vercel.app",
    ],
    credentials: true,
  })
);
app.use("/users", userRouter);
app.use("/tasks", authenticate, tasksRouter);
app.use("/tasks/ai", authenticate, createTaskAI);

app.get("/", (req, res) => {
  res.json({
    message: "Server works",
  });
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
