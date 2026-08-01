import express from "express";
import { getCurrent, login, logout, register } from "../controllers/auth";
import { authenticate } from "../../utils/utils";

export const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", authenticate, logout);
userRouter.get("/current", authenticate, getCurrent);
