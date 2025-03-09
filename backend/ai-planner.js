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
    You are a study planner AI.
    * Difficulty: {difficulty}
    * Deadline: {deadline}
    * Learner Type: {learner_type}
    * Preferred Study Hours: {study_hours}
    * Topic: {topic}

    Generate a structured study plan from **{start_date}** to **{end_date}**.
    Follow this JSON format:
    \`\`\`json
    {{
      "Introduction": "Overview of the topic",
      "Calculation": "Total study days calculated",
      "{start_date}": "Study session for {topic} - Day 1: Basics",
      "...": "...",
      "{end_date}": "Final Review",
      "Tips": "Helpful study tips",
      "Variables": {{
        "Difficulty": "{difficulty}",
        "Deadline": "{deadline}",
        "Learner Type": "{learner_type}",
        "Preferred Study Hours": "{study_hours}",
        "Topic": "{topic}"
      }}
    }}
    \`\`\`
    Ensure strict JSON formatting.
  `,
  inputVariables: ["difficulty", "deadline", "learner_type", "study_hours", "topic", "start_date", "end_date"],
});

export async function generateStudyPlan(difficulty, deadline, learner_type, study_hours, topic) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const deadlineDate = new Date(deadline);
    deadlineDate.setDate(deadlineDate.getDate() - 1); // Study until the day before the deadline
    const endStr = deadlineDate.toISOString().split("T")[0];

    const formattedPrompt = await roleplay.format({
      difficulty,
      deadline,
      learner_type,
      study_hours,
      topic,
      start_date: today,
      end_date: endStr
    });
    const response = await model.invoke(formattedPrompt);
    return response;
  } catch (error) {
    console.error("Error generating study plan:", error);
  }
}
