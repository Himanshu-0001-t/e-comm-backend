import express from "express"
import { clearCart, createOrUpdateCart, getCartByUserId, removeProductFromCart, updateProductQuantity } from "../controllers/cart.controller.js"
import { verifyUser } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/cart', verifyUser, createOrUpdateCart)
router.get('/cart/:id', verifyUser, getCartByUserId)
router.patch('/cart/update', verifyUser, updateProductQuantity)
router.post('/cart/remove', verifyUser, removeProductFromCart)
router.post('/cart/clear', verifyUser, clearCart)

export default router