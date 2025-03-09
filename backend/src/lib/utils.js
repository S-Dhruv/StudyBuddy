import jwt from "jsonwebtoken"
export const generateToken = (userID, res) => {
    const token = jwt.sign({ userID },
        process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
    })
    return token

}