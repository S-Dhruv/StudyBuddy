import express from "express";
import dotenv from "dotenv"
import authRoutes from "../backend/src/routes/auth.routes.js"
import { connectDB } from "./src/lib/db.js";import {generateStudyPlan} from "./ai-planner.js"
const app = express();
dotenv.config()
const PORT = process.env.PORT
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use(express.urlencoded({ extended: true }));app.use(express.json())

app.post("/ai",async (req,res)=>{
    const {difficulty,deadline,est,type} = req.body

    const response = await generateStudyPlan(difficulty,deadline,est,type);

    res.status(200).json(response);
})

app.listen(PORT, () => {
  console.log("Server is working at 6969");
  connectDB()
});

