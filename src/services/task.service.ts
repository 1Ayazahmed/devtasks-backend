import { Task } from "../models/task.model";

export const createTask = async (title: string, userId: string) => {
  const task = await Task.create({
    title,
    userId
  });

  return task;
};

export const getUserTasks = async (
  userId: string,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const tasks = await Task.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Task.countDocuments({ userId });

  return {
    tasks,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};





// Update Task

export const updateTask = async (
  taskId: string,
  userId: string,
  updateData: any
) => {

  const task = await Task.findOne({
    _id: taskId,
    userId
  });

  if (!task) {
    throw new Error("Task not found or not authorized");
  }

  Object.assign(task, updateData);

  await task.save();

  return task;
};



// Delete  TAsk

export const deleteTask = async (
  taskId: string,
  userId: string
) => {

  const task = await Task.findOneAndDelete({
    _id: taskId,
    userId
  });

  if (!task) {
    throw new Error("Task not found or not authorized");
  }

  return task;
};