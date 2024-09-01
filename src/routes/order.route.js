import express from "express"
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from "../controllers/order.controller.js"
import { verifyUser } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post('/create', verifyUser, createOrder)
router.get('all/:id', verifyUser, getOrders)
router.get('/:id', verifyUser, getOrderById)

router.get('/u/:id', verifyUser, updateOrder)
router.get('/d/:id', verifyUser, deleteOrder)

export default router