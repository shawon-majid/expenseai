import OpenAI from "openai";
import { OPENAI_API_KEY } from "../../../env";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export async function processExpenseText(text: string): Promise<Expense> {
  const prompt = `Parse the following expense text and return a JSON object with amount, category, description, and date. If date is not specified, use current date. Categories should be one of: Food, Transport, Shopping, Entertainment, Bills, Other.

Input: "${text}"

Response should be in this format:
{
  "amount": number,
  "category": string,
  "description": string,
  "date": "YYYY-MM-DD"
}`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  const response = completion.choices[0].message.content;
  if (!response) throw new Error("Failed to process expense");

  const parsed = JSON.parse(response);
  return {
    id: crypto.randomUUID(),
    ...parsed,
  };
}

export async function updateExpenseText(currentExpense: Expense, updateText: string): Promise<Expense> {
  const prompt = `Update the following expense based on the update text. Only modify the fields mentioned in the update text.

Current Expense:
${JSON.stringify(currentExpense, null, 2)}

Update Text: "${updateText}"

Response should be in this format:
{
  "amount": number,
  "category": string,
  "description": string,
  "date": "YYYY-MM-DD"
}`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  const response = completion.choices[0].message.content;
  if (!response) throw new Error("Failed to update expense");

  const parsed = JSON.parse(response);
  return {
    ...currentExpense,
    ...parsed,
  };
}
