import { Router } from "express"
import { protect } from "../middleware/auth.middleware"
import { createTaskController, deleteTaskController, getTasksController, updateTaskController } from "../controllers/task.controller";


const router = Router()


router.post("/", protect, createTaskController);
router.get("/", protect, getTasksController);
router.patch("/:id", protect, updateTaskController);
router.delete("/:id", protect, deleteTaskController);
export default router