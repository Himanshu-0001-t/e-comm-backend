import express from "express"
import { addCategory, deleteCategory, getSingleCategory, showAllCategory, updateCategory } from "../controllers/category.controller.js"
import { isAdmin } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/add', isAdmin, addCategory)
router.get('/all', showAllCategory)
router.get('/:id', getSingleCategory)

router.patch('/u/', isAdmin, updateCategory)
router.delete('/d/', isAdmin, deleteCategory)

export default router