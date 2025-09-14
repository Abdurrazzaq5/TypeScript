import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import fs from "fs/promises";

export async function extractPdfFromBuffer(buffer: Buffer) {
    try {
        // Create a Blob from the buffer
        const blob = new Blob([buffer], { type: 'application/pdf' });
        
        // Use PDFLoader with the blob
        const loader = new PDFLoader(blob);
        const docs = await loader.load();
        
        return docs.map((doc) => doc.pageContent).join('\n');
    } catch (error) {
        console.error("LangChain PDF extraction error:", error);
        return "";
    }
}

export async function fetchAndExtractPdfText(filePath: string) {
    try {
        // Remove file:// prefix if present
        const cleanPath = filePath.replace('file://', '');
        
        // Read the file directly from filesystem
        const fileBuffer = await fs.readFile(cleanPath);
        
        // Create a Blob from the buffer
        const blob = new Blob([fileBuffer], { type: 'application/pdf' });
        
        // Use PDFLoader with the blob
        const loader = new PDFLoader(blob);
        const docs = await loader.load();
        
        return docs.map((doc) => doc.pageContent).join('\n');
    } catch (error) {
        console.error("LangChain PDF extraction error:", error);
        return "";
    }
}
