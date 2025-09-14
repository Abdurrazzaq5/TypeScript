"use server";
import { neon } from "@neondatabase/serverless";

export async function getDbConnection() {
    if (!process.env.DATABASE_URL) {
        throw new Error('Neon database URL is not defined');
    }
    const sql = neon(process.env.DATABASE_URL || "");
    return sql;
}

export async function savePdfSummary(data: {
    userId: string;
    originalFileUrl: string;
    summaryText: string;
    title?: string;
    fileName: string;
}) {
    const sql = await getDbConnection();
    
    const result = await sql`
        INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name, status)
        VALUES (${data.userId}, ${data.originalFileUrl}, ${data.summaryText}, ${data.title || null}, ${data.fileName}, 'completed')
        RETURNING id, created_at
    `;
    
    return result[0]!;
}

export async function getPdfSummaries(userId: string) {
    const sql = await getDbConnection();
    
    const result = await sql`
        SELECT id, title, file_name, summary_text, created_at, updated_at
        FROM pdf_summaries
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
    `;
    
    return result;
}

export async function getPdfSummaryById(id: string, userId: string) {
    const sql = await getDbConnection();
    
    const result = await sql`
        SELECT id, title, file_name, summary_text, original_file_url, created_at, updated_at
        FROM pdf_summaries
        WHERE id = ${id} AND user_id = ${userId}
    `;
    
    return result[0] || null;
}