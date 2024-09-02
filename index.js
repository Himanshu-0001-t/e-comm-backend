import express from "express"
import dotenv from "dotenv"
import connectToDatabase from "./src/dbConfig.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { upload } from "./src/middleware/multer.middleware.js"
import { isAdmin, verifyUser } from "./src/middleware/auth.middleware.js"

import { login, logout, signUp } from "./src/controllers/user.controller.js"
import { clearCart, createOrUpdateCart, getCartByUserId, removeProductFromCart, updateProductQuantity } from "./src/controllers/cart.controller.js"
import { addCategory, deleteCategory, getSingleCategory, showAllCategory, updateCategory } from "./src/controllers/category.controller.js"
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from "./src/controllers/order.controller.js"
import { addProduct, deleteProduct, filterProduct, getAllProduct, getSingleProduct, updateProduct } from "./src/controllers/product.controller.js"

dotenv.config({
  path: './.env'
})

connectToDatabase()

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cors({
  origin: ['http://localhost:4000', 'https://mukul-e-commerce.onrender.com', 'https://tausif-e-commerce.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));


app.get("/", (req, res) => {
  res.send("this is web page")
})

// Auth routes 
app.post("/api/signUp", signUp)
app.post("/api/login", login)
app.post("/api/logout", verifyUser, logout)

// Cart routes 
app.post('/api/cart', verifyUser, createOrUpdateCart)
app.get('/api/cart/:id', verifyUser, getCartByUserId)
app.patch('/api/cart/update', verifyUser, updateProductQuantity)
app.post('/api/cart/remove', verifyUser, removeProductFromCart)
app.post('/api/cart/clear', verifyUser, clearCart)

// Category routes 
app.post('/api/category', isAdmin, addCategory)
app.get('/api/categorys', showAllCategory)
app.get('/api/category/:id', getSingleCategory)
app.patch('/api/category/u', isAdmin, updateCategory)
app.delete('/api/category/d', isAdmin, deleteCategory)

// Orders routes 
app.post('/api/order', verifyUser, createOrder)
app.get('/api/orders/:id', verifyUser, getOrders)
app.get('/api/order/:id', verifyUser, getOrderById)
app.get('/api/order/u/:id', verifyUser, updateOrder)
app.get('/api/order/d/:id', verifyUser, deleteOrder)

// Product routes 
app.post("/api/product", isAdmin, upload.single("image"), addProduct)
app.get("/api/products", getAllProduct)
app.get("/api/product/q", filterProduct)
app.get("/api/product/:id", getSingleProduct)
app.patch("/api/product/u/:id", isAdmin, updateProduct)
app.delete("/api/product/d/:id", isAdmin, deleteProduct)


app.listen(process.env.PORT, () => { console.log("Server is runnig " + process.env.PORT) }
)