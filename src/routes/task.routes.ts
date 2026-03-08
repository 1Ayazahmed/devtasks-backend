import { Router } from "express"
import { protect } from "../middleware/auth.middleware"

const router = Router()

router.get("/", protect, (req, res) => {
  res.json({
    message: "Protected route accessed"
  })
})

export default router