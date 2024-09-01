import express from "express"
import { addCategory, deleteCategory, getSingleCategory, showAllCategory, updateCategory } from "../controllers/category.controller.js"
import { isAdmin, verifyUser } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/', isAdmin, addCategory)
router.get('/', showAllCategory)
router.get('/:id', getSingleCategory)

router.patch('/u/', isAdmin, updateCategory)
router.delete('/d/', isAdmin, deleteCategory)

export default router