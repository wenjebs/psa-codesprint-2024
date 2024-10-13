import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyDvLIxos9xJKXNZ0gx8M3mN10fGaTt_fRY");


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function generateContent() {
  try {
    const prompt = "generate me a short 7 question true false question on Fundamentals of technology - Computer Basics separate each question with a #. "
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

