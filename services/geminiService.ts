
import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';

const apiKey = ;

if (!apiKey) {
  console.error("API_KEY is not defined in environment variables. Please set process.env.API_KEY.");
  // In a real app, you might want to prevent initialization or show a global error.
  // For this exercise, we'll let calls fail if the key is missing at runtime.
}

// Initialize with a fallback to prevent constructor error if apiKey is undefined at this point.
// The actual check for API key presence should happen before making a call.
const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY_PLACEHOLDER" });

export const generateSolution = async (
  problemStatement: string,
  examples: string,
  constraints: string
): Promise<string> => {
  if (!apiKey) {
    // This error will be caught by the calling function in App.tsx
    throw new Error("Gemini API Key is not configured. Please set the process.env.API_KEY environment variable.");
  }

  const prompt = `You are an expert Python programmer specializing in competitive programming and Data Structures and Algorithms.
Your task is to provide a Python 3 solution for the given problem.
The solution should be correct, efficient, and handle all edge cases.

Problem Statement:
---
${problemStatement}
---

Examples:
---
${examples}
---

Constraints (if provided, otherwise assume standard competitive programming limits):
---
${constraints || "No specific constraints provided. Assume standard competitive programming limits."}
---

Please provide ONLY the Python code. Do not include any explanations, introductory text, or concluding remarks.
The output should be a single block of Python code, ready to be executed. Do not use markdown fences (e.g., \`\`\`python ... \`\`\`).
`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      // No thinkingConfig specified, so it will use default (enabled), which is good for quality.
    });
    
    // Access the text directly as per Gemini API guidance
    const generatedText = response.text;

    // Basic cleanup for potential leading/trailing markdown-like fences if Gemini doesn't fully adhere
    // This is a safeguard, the prompt tries to prevent this.
    let cleanedText = generatedText.trim();
    if (cleanedText.startsWith("```python")) {
      cleanedText = cleanedText.substring("```python".length).trimStart();
    }
    if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.substring("```".length).trimStart();
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.substring(0, cleanedText.length - "```".length).trimEnd();
    }
    
    return cleanedText;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      // Provide a more user-friendly message or log detailed error for dev
      throw new Error(`Failed to generate solution via Gemini: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
