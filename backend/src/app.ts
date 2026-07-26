import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { userRouter } from "./api/router/userRouter";

interface AppError extends Error {
  status?: number;
}

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

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
