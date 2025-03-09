import express from "express";
import {generateStudyPlan} from "./ai-planner.js"
const app = express();
app.use(express.json())

app.post("/ai",async (req,res)=>{
    const {difficulty,deadline,est,type} = req.body

    const response = await generateStudyPlan(difficulty,deadline,est,type);

    res.status(200).json(response);
})

app.listen(6969, () => {
  console.log("Server is working at 6969");
});

