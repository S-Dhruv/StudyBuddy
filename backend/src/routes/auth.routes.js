import express from "express";
import { check, login, logout, signup } from "../controllers/auth.conotroller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/login", login)
router.post("/logout", logout)
router.post("/signup", signup)
router.get("/check", protectRoute, check)
export default router