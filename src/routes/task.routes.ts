import { Router } from "express"
import { protect } from "../middleware/auth.middleware"
import { createTaskController, getTasksController } from "../controllers/task.controller";


const router = Router()


router.post("/", protect, createTaskController);
router.get("/", protect, getTasksController);

export default router