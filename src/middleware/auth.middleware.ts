import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model"

interface JwtPayload {
  userId: string
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token

  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, token missing"
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      })
    }

    // attach user to request
    ;(req as any).user = user

    next()
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    })
  }
}