import mongoose from "mongoose";

const categorySchma = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

const Category = mongoose.model("Category", categorySchma)

export default Category