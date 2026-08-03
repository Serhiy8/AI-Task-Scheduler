import { Request, Response } from "express";
import { generateTask } from "../services/gemini.service";

export const createTaskAI = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    const task = await generateTask(text);

    res.json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI error",
    });
  }
};
