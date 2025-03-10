import Task from "./src/models/task.model.js";
import express from "express";
import dotenv, { parse } from "dotenv";
dotenv.config();
import authRoutes from "../backend/src/routes/auth.routes.js";
import taskRoutes from "../backend/src/routes/task.routes.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/lib/db.js";
import { generateStudyPlan } from "./ai-planner.js";
import { generateQuiz } from "./ai-quiz.js";
import cors from "cors";
import { protectRoute } from "./src/middlewares/auth.middleware.js";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.post("/api/ai", async (req, res) => {
  try {
    // const user = req.user();
    // console.log(user);
    const { difficulty, deadline, type, studyHours, topic, userId, task_type } =
      req.body;
    const response = await generateStudyPlan(
      difficulty,
      deadline,
      type,
      studyHours,
      topic,
      task_type
    );
    const val = response.content;
    const matches = val.match(/```json\n([\s\S]*?)\n```/)[1];
    const parsedData = JSON.parse(matches);
    const dateTasks = Object.entries(parsedData)
      .filter(([key]) => /^\d{4}-\d{2}-\d{2}$/.test(key))
      .map(([date, task]) => ({
        date,
        task,
        task_type,
        difficulty: "medium",
        isAiPlanned: true,
        Deadline: deadline,
        estimatedTime: "2 hours",
      }));
    console.log("before db ", dateTasks);
    for (const {
      date,
      task,
      difficulty,
      isAiPlanned,
      Deadline,
      estimatedTime,
    } of dateTasks) {
      const existingTask = await Task.findOne({
        userId: userId,
        date: new Date(date),
      });
      if (existingTask) {
        existingTask.tasks.push({
          task,
          difficulty,
          isAiPlanned,
          Deadline,
          estimatedTime,
        });
        await existingTask.save();
      } else {
        const newTask = new Task({
          userId: userId,
          date: new Date(date),
          tasks: [{ task, difficulty, isAiPlanned, Deadline, estimatedTime }],
        });
        await newTask.save();
      }
      console.log("exist", existingTask);
    }
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error in /api/ai:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});
app.post("/api/init-quiz", async (req, res) => {
  try {
    const { subjects, age } = req.body;
    const response = await generateQuiz(subjects, age);
    const val = response.content;
    const matches = [...val.matchAll(/```json\n([\s\S]*?)\n```/g)];
    res.json(matches);
  } catch (error) {
    console.log(error);
  }
});
app.post("/api/get-tasks", async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const tasks = await Task.find({ userId });
    if (!tasks) console.log("EMPTY TASKS!");
    res.status(200).json({ tasks });
  } catch {
    res.status(400).json({ message: "Internal Error" });
  }
});
app.listen(PORT, () => {
  console.log("Server is working at 6969");
  connectDB();
});
