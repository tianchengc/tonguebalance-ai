import { GoogleGenAI, Type } from "@google/genai";
import { TongueAnalysis, Language } from "../types";

const getLanguageName = (lang: Language) => {
  switch (lang) {
    case 'zh': return 'Simplified Chinese (zh-CN)';
    case 'fr': return 'French';
    default: return 'English';
  }
};

const getSystemInstruction = (language: Language) => `
You are a highly experienced Traditional Chinese Medicine (TCM) practitioner and expert, following the philosophy of "Shang Yi Zhi Wei Bing" (The superior doctor prevents disease). 
Your task is to analyze an image of a human tongue and provide a wellness assessment.

Input: An image of a tongue and a text description of symptoms.

Analysis Steps:
1. Observe the Tongue Body: Color (Pale, Red, Purple, etc.), Shape (Swollen, Thin, Teeth marks, Cracks), Moisture.
2. Observe the Tongue Coating: Color (White, Yellow, Grey), Thickness (Thin, Thick, Peeled), Texture (Greasy, Dry).
3. Diagnose the TCM Pattern: e.g., Damp-Heat, Qi Deficiency, Yin Deficiency, Blood Stasis, Liver Qi Stagnation.
4. Correlate with Symptoms provided by the user.
5. Formulate Recommendations: Dietary therapy (Food to eat/avoid), Lifestyle adjustments, and suitable Exercises (e.g., Ba Duan Jin, Tai Chi).

Output: Return a strictly formatted JSON object.
IMPORTANT: All text values in the JSON output (explanation, recommendations, pattern name, etc.) MUST be in ${getLanguageName(language)}.
DO NOT use markdown code blocks in the response, just the raw JSON.
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    tongue_body: {
      type: Type.OBJECT,
      properties: {
        color: { type: Type.STRING },
        shape: { type: Type.STRING },
        moisture: { type: Type.STRING },
      }
    },
    coating: {
      type: Type.OBJECT,
      properties: {
        color: { type: Type.STRING },
        thickness: { type: Type.STRING },
        texture: { type: Type.STRING },
      }
    },
    pattern: { type: Type.STRING, description: "The primary TCM diagnosis pattern" },
    explanation: { type: Type.STRING, description: "A gentle, clear explanation of what the tongue signs mean regarding the user's health." },
    recommendations: {
      type: Type.OBJECT,
      properties: {
        diet: {
          type: Type.OBJECT,
          properties: {
            eat: { type: Type.ARRAY, items: { type: Type.STRING } },
            avoid: { type: Type.ARRAY, items: { type: Type.STRING } },
          }
        },
        lifestyle: { type: Type.ARRAY, items: { type: Type.STRING } },
        exercise: { type: Type.STRING, description: "Specific Qigong or exercise recommendation" },
      }
    },
    suggested_course: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Name of a specific premium course (e.g., '8-Week Ba Duan Jin Mastery', 'Yin Nourishing Kitchen', 'Morning Jin Gang Gong')" },
        description: { type: Type.STRING, description: "Why this course fits the diagnosis" },
        difficulty: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] }
      }
    }
  }
};

export const analyzeTongue = async (imageBase64: string, symptoms: string, language: Language = 'en'): Promise<Omit<TongueAnalysis, 'id' | 'timestamp' | 'imageUrl' | 'symptoms'>> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBase64
            }
          },
          {
            text: `The user reports the following symptoms: "${symptoms}". Analyze the tongue image and symptoms according to TCM principles. Please provide the response in ${getLanguageName(language)}.`
          }
        ]
      },
      config: {
        systemInstruction: getSystemInstruction(language),
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};