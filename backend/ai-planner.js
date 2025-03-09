import { PromptTemplate } from "@langchain/core/prompts";
import { ChatMistralAI } from "@langchain/mistralai";
import * as dotenv from "dotenv";

dotenv.config();

const model = new ChatMistralAI({
  model: "mistral-large-latest",
  temperature: 0,
  apiKey: process.env.MISTRAL_API_KEY,
});

const roleplay = new PromptTemplate({
  template: `
    You are a personalized study planner. Consider the following factors:
     * Difficulty = {difficulty}
     * Deadline = {deadline}
     * Learner Type = {type}
     * Estimated Time = {est}
     * Preferred Study Hours = {studyHours}
     * Topic = {topic}
     Guidelines:
     1. If difficulty is high, assign more time and break it into smaller tasks.
     2. If the deadline is close and difficulty is high, prioritize this task.
     3. Adjust based on learner type: 
        - Slow learners get extended study time, limit them to the topic basics knowledge and increase the estimated time by 30% for the basics
        - Medium learners get the best of both slow and fast learner but dont overburden or overwhelm them
        - Fast learners get a compressed schedule, make them explore to more advance topics and decrease the estimated time by 30% for the basics
     4. If the estimated time is high (24+ hours), balance it across available days.
     5. Generate the plan on a date based plan (i.e if today is 2025-01-01 and the deadline is 11 days then the generate day-to-day task description as 2025-01-02 : Task 1, 2025-01-03 Task 2 so on) from the date of creation(today) to the last 2nd day of the deadline 
     6. Give the description day to day based on the topics make it generalized
     Provide the study plan in JSON format and in such a way that it follows the following schema. Remove 
  `,
  inputVariables: ["difficulty", "deadline", "est", "type","studyHours","topic"],
});

export async function generateStudyPlan(difficulty, deadline, est, type,studyHours,topic) {
  try {
    const formattedPrompt = await roleplay.format({
      difficulty,
      deadline,
      est,
      type,
      studyHours,
      topic
    });

    const jsonPrompt = `${formattedPrompt}
    
    Provide the study plan in strict JSON format with clear sub-topic labels.
    Example:
    {
      "Introduction": "Overview of the topic",
      "Calculation":"Show the calculation but just the base answer don't show the type of the user"
      "Day 1": "Cover basics...",
      "Day 2": "Practice questions...",
      "Final Review": "Revise key points...",
      "Tips": "Helpful tips to ease the process",
      
    }
    Ensure the response is valid JSON. Add addition json entries if necessary include all the details`;

    const response = await model.invoke(jsonPrompt);
    return response
  } catch (error) {
    console.error("Error generating study plan:", error);
  }
}
// generateStudyPlan("medium", "20 days","24 hours","fast")
