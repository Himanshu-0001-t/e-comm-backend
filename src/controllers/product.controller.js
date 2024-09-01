import { uploadOnCloudinary } from "../helper/cloudinary.js"
import ProductModel from "../models/product.model.js"
import Response from "../helper/response.js"
import CategoryModal from "../models/category.model.js"


export async function addProduct(req, res) {

  const { name, price, categorys, brand, description, stock, colors } = req.body

  if (!name || !description || !price || !categorys || !stock || !colors) {
    return Response.error(res, "all fields are required")
  }
  let category = categorys.split(", ")
  try {
    let categoryExist = await CategoryModal.findOne({ categoryName: { $in: category } })

    if (!categoryExist) {
      return Response.notFound(res, "category not found")
    }

    const localfilepath = req.file.path

    if (!localfilepath) {
      return Response.error(res, { message: "image is required" })
    }

    const productImageURL = await uploadOnCloudinary(localfilepath)
    if (!productImageURL) {

      return Response.error(res, { message: "Error while uploding image on cloudinary" })
    }

    const newproduct = new ProductModel({
      name,
      description,
      price,
      category,
      brand,
      stock,
      colors,
      image: productImageURL
    })

    const saved = await newproduct.save()

    return Response.success(res, saved, "Product add successfully")

  } catch (error) {

    return Response.error(res, "server error", 500, error)

  }
}

export async function getAllProduct(req, res) {
  try {
    let totalProduct = await ProductModel.countDocuments()

    if (req.query.limit) {
      totalProduct = parseInt(req.query.limit)
    }

    const Products = await ProductModel.aggregate([{ $sample: { size: totalProduct } }])

    if (!Products || Products.length == 0) {

      return Response.notFound(res, "Products not found")
    }
    return Response.success(res, Products, "product Feached Successfully")

  } catch (error) {
    return Response.error(res, "server error", 500, { error })
  }
}

export async function getSingleProduct(req, res) {

  let id = req.params.id
  try {
    const product = await ProductModel.findById(id)

    if (!product) {

      return Response.notFound(res, "product not found")
    }

    return Response.success(res, product, "product feached successfully")

  } catch (error) {

    return Response.error(res, "server error", 500, error)
  }
}

export async function filterProduct(req, res) {
  let { brand, price, category, search } = req.query
  let query = {}

  if (brand) {
    query.brand = brand
  }

  if (price) {
    query.price = price
  }

  if (category) {
    query.category = category
  }


  if (search) {
    query.category = search
  }

  try {

    let product = await ProductModel.find(query)

    if (!product || product.length == 0) {

      return Response.notFound(res, "product not found")
    }

    return Response.success(res, product, "product feached successfully")

  } catch (error) {

    return Response.error(res, "server error", 500, error)
  }
}

export async function updateProduct(req, res) {
}

export async function deleteProduct(req, res) {
}