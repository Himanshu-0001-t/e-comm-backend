import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./src/dbConfig.js"

import userRouter from "./src/routes/auth.route.js"
import productRouter from "./src/routes/product.route.js"
import categoryRouter from "./src/routes/category.route.js"
import cartRouter from './src/routes/cart.route.js'
import orderRouter from './src/routes/order.route.js'

import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config({
  path: './.env'
})

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cors({
  origin: ['http://localhost:4000', 'https://mukul-e-commerce.onrender.com', 'https://tausif-e-commerce.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));


app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/category", categoryRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  res.send("Welcome to my web page")
})


app.listen(process.env.PORT, () => {
  connectDB()
  console.log("Server is runnig")
}
)