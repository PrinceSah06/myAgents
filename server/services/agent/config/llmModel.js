import { ChatGenerationChunk } from "@langchain/core/outputs";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { configDotenv } from "dotenv";

configDotenv()


const groq = new ChatGroq({
  apiKey:process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
});

const gemini = new ChatGoogleGenerativeAI({
  apiKey:process.env.GOOGLE_GEMINI_KEY,
  model: "gemini-2.5-flash",
});


export const getModel= (agent)=>{

    switch (agent) {
      case "coding":
        return gemini;

      default:
        return groq;
    }

}
