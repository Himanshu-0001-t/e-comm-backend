import mongoose from "mongoose";

export function connectDB() {

  try {
    mongoose.connect(process.env.MONGODB_URI)

    mongoose.connection.on("success", () => {
      console.log("MogoDB Connected Successfully")
    })

    mongoose.connection.on("error", () => {
      console.log("Error in connecting to datadase")
      process.exit(1)
    })
  } catch (error) {

    console.log("Error in connecting to datadase")
    process.exit(1)
  }
}