import express from "express"
import { addProduct, deleteProduct, filterProduct, getAllProduct, getSingleProduct, updateProduct } from "../controllers/product.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { isAdmin } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post("/add", isAdmin, upload.single("image"), addProduct)
router.get("/search", filterProduct)
router.get("/all", getAllProduct)
router.get("/:id", getSingleProduct)

router.patch("/u/:id", isAdmin, updateProduct)
router.delete("/d/:id", isAdmin, deleteProduct)


export default router