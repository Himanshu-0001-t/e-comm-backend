import Category from "../models/category.model.js"
import Response from "../helper/response.js"

export const addCategory = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return Response.error(res, "Category name is required")
        }
        let lower = name.toLowerCase()

        const iscategoryExist = await Category.findOne({ name: lower })

        if (iscategoryExist) {
            return Response.error(res, "Category already exist")
        }

        const createdCategory = await new Category({
            categoryName: lower
        }).save()

        return Response.success(res, createdCategory, "Category created successfully", 201)

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }

}

export const showAllCategory = async (req, res) => {
    try {
        const categorys = await Category.find()

        if (!categorys || categorys.length == 0) {

            return Response.notFound(res, "Category not found")
        }

        return Response.success(res, categorys, "Category feached successfylly")

    } catch (error) {

        return Response.error(res, "Server error", 500, error)
    }
}

export const getSingleCategory = async (req, res) => {

    const id = req.params.id

    if (!id) {
        return Response.error(res, "Id is required")
    }

    try {
        const feachedCategory = await Category.findOne({ _id: id })

        if (!feachedCategory || feachedCategory.length == 0) {

            return Response.notFound(res, "Category not found")
        }

        return Response.success(res, feachedCategory, "Category feached successfully")

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }
}

export const updateCategory = async (req, res) => {

    let { id, name } = req.body

    if (!id) {
        return Response.error(res, "id is required")
    }

    try {

        let updatedCategory = await Category.findByIdAndUpdate(id, { $set: { categoryName: name } }, { new: true, returnDocument: "after" })

        if (!updatedCategory) {

            return Response.notFound(res, "Category not found")
        }

        return Response.success(res, updateCategory, "Category updated successfully")

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }
}

export const deleteCategory = async (req, res) => {

    let { id } = req.body

    if (!id) {

        return Response.error(res, "id is required")
    }

    try {

        let deletedCategory = await Category.findByIdAndDelete(id)

        if (!deletedCategory) {

            return Response.notFound(res, "category not found")
        }

        return Response.success(res, "category deleted succesfully")

    } catch (error) {

        return Response.error(res, "server error", 500, error)
    }
}