import express from "express";
import dotenv from "dotenv"
import authRoutes from "../backend/src/routes/auth.routes.js"
import taskRoutes from "../backend/src/routes/task.routes.js"
import cookieParser from "cookie-parser";
import { connectDB } from "./src/lib/db.js";
import { generateStudyPlan } from "./ai-planner.js";
import { generateQuiz } from "./ai-quiz.js";
import cors from "cors";
import { protectRoute } from "./src/middlewares/auth.middleware.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/ai", protectRoute, async (req, res) => {
  try {
    // const user = req.user();
    // console.log(user);
    const { difficulty, deadline, type, studyHours, topic } = req.body;
    const response = await generateStudyPlan(
      difficulty,
      deadline,
      type,
      studyHours,
      topic
    );
    const val = response.content;
    const matches = val.match(/```json\n([\s\S]*?)\n```/);
    console.log(matches[1]);
    res.status(200).json(matches[1])
  } catch {
    res.status(400).json({ message: "Internal Error" });
  }
});
app.post("/api/init-quiz", protectRoute, async (req, res) => {
  try {
    const { subjects, age } = req.body;
    const response = (await generateQuiz(subjects, age))
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});


app.listen(PORT, () => {
  console.log("Server is working at 6969");
  connectDB();
});
