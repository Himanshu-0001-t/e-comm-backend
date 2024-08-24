import express from "express"
import { addCategory, deleteCategory, getSingleCategory, showAllCategory, updateCategory } from "../controllers/category.controller.js"
import { isAdmin, verifyUser } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/category', isAdmin, addCategory)

router.get('/categorys', showAllCategory)
router.get('/category/:id', getSingleCategory)

router.patch('/category/u/', isAdmin, updateCategory)
router.delete('/category/d/', isAdmin, deleteCategory)

export default router