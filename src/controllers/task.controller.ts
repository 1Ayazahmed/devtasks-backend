import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { createTask, getUserTasks } from "../services/task.service";
import { updateTask } from "../services/task.service";
import { deleteTask } from "../services/task.service";

import { createTaskSchema } from "../validators/task.validator";



export const createTaskController = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = createTaskSchema.parse(req.body);

  // const { title } = req.body;

  // const user = (req as any).user;
  const user = req.user;

  const task = await createTask(  validatedData.title, user!._id);

  res.status(201).json({
    success: true,
    data: task
  });
});

export const getTasksController = asyncHandler(async (req: Request, res: Response) => {
  // const user = (req as any).user;
  const user = req.user;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await getUserTasks(user!._id, page, limit);

  res.status(200).json({
    success: true,
    data: result.tasks,
    pagination: {
      total: result.total,
      page: result.page,
      pages: result.pages
    }
  });
});




export const updateTaskController = asyncHandler(async (req: Request, res: Response) => {

  const taskId = req.params.id;

  const user = req.user;

  const updatedTask = await updateTask(
    taskId,
    user!._id,
    req.body
  );

  res.status(200).json({
    success: true,
    data: updatedTask
  });

});




export const deleteTaskController = asyncHandler(async (req:Request, res:Response) => {

  const taskId = req.params.id;

  const user = req.user;

  const deletedTask = await deleteTask(
    taskId,
    user!._id
  );

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask
  });

});