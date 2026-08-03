import { Request, Response } from "express";
import { generateTask } from "../services/gemini.service";

interface AiError extends Error {
  statusText: string;
}

export const createTaskAI = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    const task = await generateTask(text);

    res.json(task);
  } catch (error: unknown) {
    const aiError = error as AiError;
    console.log(error);
    res.status(500).json({
      message: aiError?.statusText || "AI error",
    });
  }
};
