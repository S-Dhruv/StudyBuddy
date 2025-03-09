import express from "express";
import dotenv from "dotenv"
import authRoutes from "../backend/src/routes/auth.routes.js"
import taskRoutes from "../backend/src/routes/task.routes.js"
import {generateStudyPlan} from "./ai-planner.js"
import cookieParser from "cookie-parser";
import { connectDB } from "./src/lib/db.js"; 
import { generateQuiz } from "./ai-quiz.js";
import cors from "cors";
const app = express();
dotenv.config();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/ai", async (req, res) => {
  try {
    const { difficulty, deadline, est, type, studyHours, topic } = req.body;
    const response = await generateStudyPlan(
      difficulty,
      deadline,
      est,
      type,
      studyHours,
      topic
    );
    res.status(200).json(response);
  } catch {
    res.status(400).json({ message: "Internal Error" });
  }
});

app.post("/quiz", async (req, res) => {
  try {
    const { subjects, age } = req.body;
    const response = await generateQuiz(subjects, age);
    res.status(200).json(response);
  } catch (err) {
    res.json(err);
  }
});


app.listen(PORT, () => {
  console.log("Server is working at 6969");
  connectDB();
});
