import { GoogleGenAI, Modality } from "@google/genai";
import { GenerativePart } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateMockup(
  productPart: GenerativePart,
  logoPart: GenerativePart,
  userPrompt: string
): Promise<string> {
  const model = 'gemini-2.5-flash-image';
  
  const prompt = `
    Act as a professional mockup designer. Your task is to place the second image (a logo) 
    onto the first image (a product) to create a realistic and visually appealing product mockup.
    
    - The first image provided is the product base.
    - The second image provided is the logo to be placed on the product.
    
    Apply the logo naturally to the product's surface, considering lighting, texture, and perspective.
    
    Additional user instructions: "${userPrompt || 'No specific instructions.'}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          productPart,
          logoPart,
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const firstPart = response.candidates?.[0]?.content?.parts?.[0];

    if (firstPart && firstPart.inlineData) {
      return `data:${firstPart.inlineData.mimeType};base64,${firstPart.inlineData.data}`;
    } else {
      throw new Error("No image was generated in the response.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The AI model failed to generate an image. Please check the console for more details.");
  }
}
