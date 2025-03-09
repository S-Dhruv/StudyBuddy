import express from "express";
import { check, DecideScore, login, logout, signup } from "../controllers/auth.conotroller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/login", login)
router.post("/logout", logout)
router.post("/signup", signup)
router.get("/check", protectRoute, check)
router.post("/decide", DecideScore)
export default router