import { ai } from "../config/geminiAI";

export const generateTask = async (text: string) => {
  const model = ai.getGenerativeModel({
    model: "gemini-3.6-flash",
  });

  const prompt = ` Ти AI помічник створюй задачі по запиту.
  Розставляй вірно переноси рядків, щоб в картці завдань гарно відображалось. Розписуй запит детально.
 Створи JSON:
 { "title":"", "description":"" }
 
 Текст користувача:
 ${text} `;

  const result = await model.generateContent(prompt);
  const task = result.response.text();
  const cleanJson = task
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleanJson);
};
