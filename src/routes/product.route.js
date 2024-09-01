import express from "express"
import { addProduct, deleteProduct, filterProduct, getAllProduct, getSingleProduct, updateProduct } from "../controllers/product.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { isAdmin } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post("/", isAdmin, upload.single("image"), addProduct)

router.get("/", getAllProduct)
router.get("/:id", getSingleProduct)
router.get("/q/", filterProduct)

router.patch("/u/:id", isAdmin, updateProduct)
router.delete("/d/:id", isAdmin, deleteProduct)


export default router