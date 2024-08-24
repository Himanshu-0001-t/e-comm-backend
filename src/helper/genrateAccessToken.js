import jwt from "jsonwebtoken"

const generateAccessToken = (userId) => {

    try {
        const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '10d' })

        return accessToken

    } catch (error) {

        return null
    }
}

export default generateAccessToken