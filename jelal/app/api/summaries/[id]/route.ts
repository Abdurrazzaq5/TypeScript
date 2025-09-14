import { NextRequest, NextResponse } from "next/server";
import { getPdfSummaryById } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        
        const summaryId = params.id;
        const summary = await getPdfSummaryById(summaryId, userId);
        
        if (!summary) {
            return NextResponse.json(
                { error: "Summary not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json({ summary });
    } catch (error) {
        console.error("Error fetching summary:", error);
        return NextResponse.json(
            { error: "Failed to fetch summary" },
            { status: 500 }
        );
    }
}
