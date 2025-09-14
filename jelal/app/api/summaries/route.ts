import { NextRequest, NextResponse } from "next/server";
import { getPdfSummaries } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        
        const summaries = await getPdfSummaries(userId);
        
        return NextResponse.json({ summaries });
    } catch (error) {
        console.error("Error fetching summaries:", error);
        return NextResponse.json(
            { error: "Failed to fetch summaries" },
            { status: 500 }
        );
    }
}
