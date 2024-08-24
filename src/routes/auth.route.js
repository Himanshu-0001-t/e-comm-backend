import express from "express"
import { login, logout, signUp } from "../controllers/user.controller.js"
import { verifyUser } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signUp", signUp)
router.post("/login", login)
router.post("/logout", verifyUser, logout)

export default router
