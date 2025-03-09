import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
    try {
        console.log("in protected route");
        const token = req.cookies.jwt
        console.log("Token : ", token);
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access-No Token!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded :", decoded);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized Token-Invalid!"
            })
        }
        const user = await User.findById(decoded.userID).select("-passWord")
        console.log("User :", user);


        if (!user) {
            return res.status(404).json({
                message: "No User!"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            message: "Internal Error!"
        })
    }
}