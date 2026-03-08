import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { createTask, getUserTasks } from "../services/task.service";

export const createTaskController = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;

  const user = (req as any).user;

  const task = await createTask(title, user._id);

  res.status(201).json({
    success: true,
    data: task
  });
});

export const getTasksController = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const tasks = await getUserTasks(user._id);

  res.status(200).json({
    success: true,
    data: tasks
  });
});