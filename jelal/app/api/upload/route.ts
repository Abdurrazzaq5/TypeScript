import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { extractPdfFromBuffer } from "@/lib/langchain";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { savePdfSummary } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const uploadFileSchema = z.object({
    file: z
        .instanceof(File, { message: "Invalid file" })
        .refine((file) => file.size <= 20 * 1024 * 1024, {
            message: "File size must be less than 20MB",
        })
        .refine(
            (file) => file.type.startsWith("application/pdf"),
            "File size must be a PDF"
        ),
});

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        
        const formData = await req.formData()
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" }, 
                { status: 400 }
            );
        }

        //Schema
        const validation = uploadFileSchema.safeParse({ file });
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.errors[0].message }, 
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Process PDF directly in memory without temp files
        const textExtract = await extractPdfFromBuffer(buffer);
        
        if (!textExtract || textExtract.trim().length === 0) {
            return NextResponse.json(
                { error: "Could not extract text from PDF" }, 
                { status: 400 }
            );
        }
        
        const summary = await generateSummaryFromGemini(textExtract);
        
        if (!summary || summary.trim().length === 0) {
            return NextResponse.json(
                { error: "Failed to generate summary" }, 
                { status: 500 }
            );
        }
        
        // Extract title from summary for database storage
        const titleMatch = summary.match(/^#\s*(.+)$/m);
        const title = titleMatch?.[1] || file.name.replace('.pdf', '');
        
        // Save to database with actual user ID
        const savedSummary = await savePdfSummary({
            userId: userId,
            originalFileUrl: file.name, // Store filename instead of temp path
            summaryText: summary,
            title: title,
            fileName: file.name
        });
        
        return NextResponse.json({
            summary,
            summaryId: savedSummary.id,
            title: title
        });
    } catch (error){
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        );
    }
}

