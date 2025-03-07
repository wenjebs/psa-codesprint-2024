import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyDvLIxos9xJKXNZ0gx8M3mN10fGaTt_fRY");


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function generateContent() {
  try {
    const prompt = "Generate me 10 multiple choice questions about possible skills that need improvement for an employee in Port of Singapore Authority to measure their capabilities in various skills. The skills are technology, safety, leadership, working under pressure, data analysis, trend analystics, maritime operations, cybersecurity, sustainability and artificial intelligence in that order each time. phrase all your questions such as How confident are you in (rest of question) Return me the questions in plain text separated by hashtag only. ask me variations of questions each time, dont include '**' for format and dont include a # at the end of the last question and dont provide me the options";
    const result = await model.generateContent(prompt);
    const reponse = await result.response;
    console.log(result.response.text());
    const splitted = result.response.text().split("#").map(question => question.trim());
    const trimmed = splitted.slice(0, -1); 
    console.log(trimmed);
    return trimmed;
  } catch (error) {
    console.error("Error generating content:", error);
  }

  
}

