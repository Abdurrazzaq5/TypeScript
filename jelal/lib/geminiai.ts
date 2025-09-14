import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import {GoogleGenerativeAI} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateSummaryFromGemini = async (pdfText: string, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash', generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1500,
            }});

            const prompt = {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {text: SUMMARY_SYSTEM_PROMPT},
                            {
                                text: `Transform this document into an easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
                            },
                        ],
                    },
                ],
            };

            const result = await model.generateContent(prompt);
            const response = await result.response;

            if(!response.text) {
                throw new Error('Empty response from Gemini API')
            }
            return response.text();
        } catch (error: any) {
            console.error(`Gemini API Error (attempt ${attempt}/${retries}):`, error);
            
            // If it's a 503 error and we have retries left, wait and try again
            if (error.status === 503 && attempt < retries) {
                const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
                console.log(`Waiting ${waitTime}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
                continue;
            }
            
            // If all retries failed, return a fallback response
            if (attempt === retries) {
                return generateFallbackSummary(pdfText);
            }
            
            throw error;
        }
    }
}

const generateFallbackSummary = (pdfText: string) => {
    const words = pdfText.split(' ').slice(0, 200).join(' ');
    return `# Document Summary

🎯 **Document processed successfully** - AI service temporarily unavailable

## Key Content Preview
• 📄 **Text extracted**: ${words.length > 0 ? words + '...' : 'No readable text found'}
• 🔄 **Status**: Processed with fallback summary
• 💡 **Note**: Full AI analysis will be available when service is restored

## Next Steps
• ⭐ Try uploading again in a few minutes
• 💎 The document has been successfully processed
• 🌟 Full AI analysis will be available shortly

*This is a fallback summary while the AI service is temporarily overloaded.*`;
}