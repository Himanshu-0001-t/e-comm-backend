import express from "express"
import { clearCart, createOrUpdateCart, getCartByUserId, removeProductFromCart, updateProductQuantity } from "../controllers/cart.controller.js"
import { verifyUser } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/add', verifyUser, createOrUpdateCart)
router.get('/:id', verifyUser, getCartByUserId)
router.patch('/update', verifyUser, updateProductQuantity)
router.post('/remove', verifyUser, removeProductFromCart)
router.post('/clear', verifyUser, clearCart)

export default router