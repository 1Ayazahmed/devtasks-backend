import { Task } from "../models/task.model";

export const createTask = async (title: string, userId: string) => {
  const task = await Task.create({
    title,
    userId
  });

  return task;
};

export const getUserTasks = async (userId: string) => {
  const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

  return tasks;
};