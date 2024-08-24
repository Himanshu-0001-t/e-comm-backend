import express from "express"
import { addProduct, deleteProduct, filterProduct, getAllProduct, getSingleProduct, updateProduct } from "../controllers/product.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { isAdmin } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post("/product", isAdmin, upload.single("image"), addProduct)

router.get("/products", getAllProduct)
router.get("/product/:id", getSingleProduct)
router.get("/products/q/", filterProduct)

router.patch("/product/u/:id", isAdmin, updateProduct)
router.delete("/product/d/:id", isAdmin, deleteProduct)


export default router