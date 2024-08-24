import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

import dotenv from "dotenv"
dotenv.config({
  path: './.env'
})


export async function uploadOnCloudinary(localFilePath) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });

    if (!localFilePath) return null

    const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto", folder: "ecommerce" })

    fs.unlinkSync(localFilePath)

    return response.url

  } catch (error) {

    fs.unlinkSync(localFilePath)

    return null
  }
}
