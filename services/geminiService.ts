
import { GoogleGenAI } from "@google/genai";

export const getAiInsight = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key not configured. Please set the API_KEY environment variable.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert business analyst for a POS system. Provide concise, data-driven insights based on the user's query. Format your response as clean markdown."
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I couldn't fetch insights at the moment. Please try again later.";
  }
};
