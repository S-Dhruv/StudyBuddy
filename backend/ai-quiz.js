import { PromptTemplate } from "@langchain/core/prompts";
import { ChatMistralAI } from "@langchain/mistralai";
import * as dotenv from "dotenv";


const model = new ChatMistralAI({
  model: "mistral-large-latest",
  temperature: 0,
  apiKey: process.env.MISTRAL_API_KEY,
});

const quizgen = new PromptTemplate({
  template: `
    You have to generate knowledge based quizes to determine if the user is a slow,medium or a fast learner.
    Give the correct and wrong options.Personalize the questions on the following factors:
    1. Subjects = {subjects}
    2. Age ={age}

    Guidelines 
    1. If the user is younger than 14 do not generate a personality quiz
    2. Ensure that the quiz is appropriate for the age and subjects
  `,
  inputVariables: ["subjects", "age"],
});

export async function generateQuiz(subjects, age) {
  try {
    const formattedPrompt = await quizgen.format({
      subjects,
      age
    });

    const jsonPrompt = `${formattedPrompt}
    Give me an array of questions, wrong options and correct option for each test. 
    Make sure it is a JSON format and it is easy to parse and display.
   `
    const response = await model.invoke(jsonPrompt);
    return response
  } catch (error) {
    console.error("Error generating study plan:", error);
  }
}
// generateStudyPlan("medium", "20 days","24 hours","fast")
