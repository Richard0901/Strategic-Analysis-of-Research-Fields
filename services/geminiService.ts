import { GoogleGenAI } from "@google/genai";
import { STRATEGIC_ANALYSIS_PROMPT_TEMPLATE } from "../constants";

export interface AnalysisInput {
  field: string;
  literatureData: string;
}

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const analyzeResearchField = async (input: AnalysisInput): Promise<string> => {
  const ai = getAIClient();
  
  // Interpolate the prompt
  const prompt = STRATEGIC_ANALYSIS_PROMPT_TEMPLATE
    .replace('{{FIELD}}', input.field)
    .replace('{{LITERATURE_DATA}}', input.literatureData);

  try {
    // Using gemini-3-pro-preview for complex reasoning and strategic analysis
    // as per developer guidelines for "Complex Text Tasks".
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 8192 }, // Increased budget for deep strategic analysis
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response generated from the model.");
    }
    return text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};