import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askAboutLeopardCat(question: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是一位台灣石虎專家。請用親切且專業的口吻回答關於石虎的問題。
      問題：${question}`,
      config: {
        systemInstruction: "你是一位台灣石虎保育專家，致力於向大眾推廣石虎知識。你的回答應該包含科學事實，同時充滿關懷。如果問題與石虎無關，請禮貌地引導回石虎話題。",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "抱歉，我現在無法回答，請稍後再試。";
  }
}
