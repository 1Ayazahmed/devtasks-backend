import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { login } from "../controllers/auth.controller";
import { loginLimiter } from "../middleware/rateLimit.middleware";


const router = Router();

router.post("/register", register);


router.post("/login",loginLimiter, login);

export default router;