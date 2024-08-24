import express from "express"
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from "../controllers/order.controller.js"
import { verifyUser } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post('/order/', verifyUser, createOrder)
router.get('/orders/:id', verifyUser, getOrders)
router.get('/order/:id', verifyUser, getOrderById)
router.get('/order/u/:id', verifyUser, updateOrder)
router.get('/orders/d/:id', verifyUser, deleteOrder)

export default router