import fs from "fs/promises";

export async function extractPdfText(
  input: string | Buffer | ArrayBuffer | Uint8Array
): Promise<string> {
  try {
    // Use pdfjs-dist for reliable PDF text extraction
    const pdfjsLib = await import("pdfjs-dist");
    
    let buffer: Buffer;
    if (typeof input === "string") {
      buffer = await fs.readFile(input);
    } else if (input instanceof Buffer) {
      buffer = input;
    } else if (input instanceof Uint8Array) {
      buffer = Buffer.from(input);
    } else {
      buffer = Buffer.from(input as ArrayBuffer);
    }

    const uint8Array = new Uint8Array(buffer);
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
    
    let fullText = "";
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
      fullText += pageText + "\n";
    }
    
    return fullText.trim();
  } catch (err) {
    console.error("PDF extraction error:", err);
    return "";
  }
}


