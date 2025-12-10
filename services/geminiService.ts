import { GoogleGenAI, Type } from "@google/genai";
import { AIResponseSchema } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Anti-Stuck AI", a productivity assistant for Gen Z users (18-25). 
Your goal is to help users who feel overwhelmed by breaking large tasks into TINY, laughable simple steps.

Tone Guidelines:
- Casual, friendly, supportive, and slightly humorous.
- Use Gen Z slang naturally (e.g., "no cap", "vibes", "slay", "lowkey", "bet") but don't overdo it to be cringy.
- Be empathetic. Acknowledge that starting is the hardest part.

Task logic:
- Break the user's input into 3 to 6 very small, actionable steps.
- The first step should be incredibly easy (e.g., "Stand up", "Open the laptop", "Put on music").
- Provide a short "motivation" tip for each step.

Input examples:
"I need to clean my room" -> Steps: ["Pick up trash", "Put clothes in hamper", "Make bed"]
"Start a side project" -> Steps: ["Open empty doc", "Write one sentence idea", "Name the project"]
`;

export const breakDownTask = async (userGoal: string): Promise<AIResponseSchema> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userGoal,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallVibe: {
              type: Type.STRING,
              description: "A short, encouraging sentence about the task using Gen Z slang.",
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: "Actionable step title (3-5 words max).",
                  },
                  description: {
                    type: Type.STRING,
                    description: "A tiny detail on how to do it.",
                  },
                  motivation: {
                    type: Type.STRING,
                    description: "A very short emoji-rich hype message.",
                  },
                },
                required: ["title", "description", "motivation"],
              },
            },
          },
          required: ["overallVibe", "steps"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIResponseSchema;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};