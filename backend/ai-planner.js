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
     You are a study planner which takes into account the following factors and makes a study plan by allocating time throughout the days until the deadline:
     The factors to consider include:
     * Difficulty = {difficulty}
     * Deadline = {deadline}
     * Learner type = {type}
     * Estimated time taken = {est}

     Guidelines:
     1. If the difficulty is high, assign more time to complete the task and vice versa.
     2. If the deadline is close and the difficulty is high, allocate more time accordingly.
     3. If the learner is slow, assign more time and vice versa.
     4. If the estimated time is high (more than 24 hours), adjust based on learner type, deadline, and difficulty.
     Give the output in a json file label the keys as the sub topics you chose to display
  `,
  inputVariables: ["difficulty", "deadline", "est", "type"],
});

export async function generateStudyPlan(difficulty, deadline, est, type) {
  try {
    const formattedPrompt = await roleplay.format({
      difficulty,
      deadline,
      est,
      type,
    });

    const jsonPrompt = `${formattedPrompt}
    
    Provide the study plan in strict JSON format with clear sub-topic labels.
    Example:
    {
      "Introduction": "Overview of the topic",
      "Day 1": "Cover basics...",
      "Day 2": "Practice questions...",
      "Final Review": "Revise key points..."
    }
    Ensure the response is valid JSON with no extra text. Add addition json entries if necessary include all the details`;

    const response = await model.invoke(jsonPrompt);
    return response 
  } catch (error) {
    console.error("Error generating study plan:", error);
  }
}
// generateStudyPlan("medium", "20 days","24 hours","fast")
