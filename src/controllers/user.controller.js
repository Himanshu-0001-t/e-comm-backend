import generateAccessToken from "../helper/genrateAccessToken.js"
import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { validateEmail, validatePhoneNumber } from "../helper/input-validation.js"
import Response from "../helper/response.js"


export async function signUp(req, res) {

  const { fullName, email, password, phone } = req.body

  if (!fullName || !email || !password || !phone) {
    return Response.validationError(res, "Empty field")
  }

  try {

    const validEmail = validateEmail(email)

    if (!validEmail) {
      return Response.validationError(res, 'Invalid email address')
    }

    if (phone.length < 10 || phone.length > 10) {
      return Response.validationError(res, 'Invalid Phone No')
    }

    const validPhone = validatePhoneNumber(phone)

    if (!validPhone) {
      return Response.validationError(res, 'Invalid Phone No')
    }

    const findedUser = await userModel.findOne({ email })

    if (findedUser) {
      return Response.validationError(res, "Email already exist use another email")
    }

    if (password.length < 6) {
      return Response.validationError(res, 'Password must be at least 6 characters long');
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = new userModel({
      fullName,
      email,
      phone,
      password: hashedPassword
    })

    await newUser.save()

    return Response.success(res, "User Ragister successfully")

  } catch (error) {

    return Response.error(res, { message: "Server Error" }, error)

  }
}

export async function login(req, res) {
  const { email, password } = req.body

  if (!email, !password) {
    return Response.validationError(res, "Empty field")
  }

  const validEmail = validateEmail(email)

  if (!validEmail) {
    return Response.validationError(res, 'Invalid email address')
  }

  try {

    const userInDb = await userModel.findOne({ email })

    if (!userInDb) {
      return Response.notFound(res, "Email Not Found")
    }

    const passwordMatch = await bcrypt.compare(password, userInDb.password)

    if (!passwordMatch) {
      return Response.validationError(res, "Wrong Credentials")
    }

    const accessToken = generateAccessToken(userInDb._id)

    if (!accessToken) {
      return Response.error(res, "Error while genrating access token")
    }

    const option = {
      httpOnly: true,
      secure: true,
      maxAge: 360000 * 60 * 60,
      sameSite: 'lax'
    }

    return res
      .status(201)
      .cookie("accessToken", accessToken, option)
      .json({ success: true, message: "User Loged in successfully", user_id: userInDb._id })

  } catch (error) {
    return Response.error(res, { message: "server error" }, error)
  }
}

export async function logout(req, res) {

  const option = {
    httpOnly: true,
    secure: true,
    maxAge: 360000 * 60 * 60
  }

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .json({ success: true, message: "User Loged Out successfully" })
}