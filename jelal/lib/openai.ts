import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function generateSummaryFromOpenAI(pdfText: string) {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4", // Use an available model
            messages: [
                { role: "system", content: SUMMARY_SYSTEM_PROMPT },
                { role: "user", content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`, }
            ],
            temperature: 0.7,
            max_tokens: 1500, // Correct parameter name
        });

        return response.choices[0].message.content; // Correct way to access the response text
    } catch(error: any) {
        if (error?.status === 429) {
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
        throw error;
    }
}
