import rateLimit from "express-rate-limit";

/* General API limiter */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later"
  },
  standardHeaders: true,
  legacyHeaders: false
});

/* Login limiter (stronger protection) */
export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 login attempts
  message: {
    success: false,
    message: "Too many login attempts. Try again in 1 minute."
  },
  standardHeaders: true,
  legacyHeaders: false
});