import { ai } from "../config/geminiAI";


export const generateTask = async (text:string) => {
  const model = ai.getGenerativeModel({
    model: "gemini-3.6-flash",
  });

 const prompt = ` Ти AI помічник для створення задач.
 Створи JSON:
 { "title":"", "description":"", "priority":"low | medium | high" }
 Текст користувача:
 ${text} `;

  const result = await model.generateContent(prompt);
  const task = result.response.text();
  const cleanJson = task
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
  return JSON.parse(cleanJson);
}

// export const generateTask = async (text:string) => {

// const model = geminiAI.getGenerativeModel({
//  model:"gemini-3.6-flash"
// });


// const prompt = `
// Ти AI помічник для створення задач.

// Створи JSON:

// {
// "title":"",
// "description":"",
// "priority":"low | medium | high"
// }

// Текст користувача:

// ${text}
// `;


// const result = await model.generateContent(prompt);


// const response =
// result.response.text();


// return JSON.parse(response);

// }