import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import Response from "../helper/response.js"

export async function verifyUser(req, res, next) {
  try {
    const authToken = req.cookies.Access_Token || req.header("Authorization")?.replace("Bearer ", "")

    if (!authToken) {
      return Response.unauthorized(res, "Unauthorized User")
    }

    const decotedToken = jwt.verify(authToken, process.env.JWT_SECRET)

    if (!decotedToken) {
      return Response.error(res, "Invalid accessToken login again")
    }

    const userInDb = await User.findById({ _id: decotedToken.id }).select("-password")

    if (!userInDb) {
      return Response.notFound(res, "Unauthorized User")
    }

    req.user = userInDb

    next()

  } catch (error) {

    return Response.error(res, "server error", error)
  }
}

export async function isAdmin(req, res, next) {
  const user = req.user

  if (!user) {
    return Response.unauthorized(res)
  }

  if (user.roll == "Admin") {
    next()
  } else {
    return Response.unauthorized(res)
  }
}