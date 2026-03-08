import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import asyncHandler from "../utils/asyncHandler";
import { loginUser } from "../services/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await registerUser(name, email, password);

  res.status(201).json({
    success: true,
    data: user
  });
});




//Login 

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  res.status(200).json({
    success: true,
    data: result
  });
});