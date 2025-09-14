"use client";

import { useEffect, useState } from "react";

type SummaryItem = {
    id: string;
    title: string | null;
    file_name: string;
    summary_text: string;
    created_at: string;
    updated_at?: string;
};

export default function UserCollection() {
    const [summaries, setSummaries] = useState<SummaryItem[]>([]);
    const [selectedSummary, setSelectedSummary] = useState<SummaryItem | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSummaries = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch("/api/summaries", { method: "GET" });
                if (!response.ok) {
                    throw new Error("Failed to fetch summaries");
                }
                const data = await response.json();
                const list: SummaryItem[] = data?.summaries ?? [];
                setSummaries(list);
                setSelectedSummary(list.length > 0 ? list[0] : null);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Unknown error";
                setError(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSummaries();
    }, []);

    return(
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                <div className="lg:col-span-1">
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Your Normalization Summaries</h3>
                        {isLoading && (
                            <p className="text-sm text-gray-500">Loading summaries...</p>
                        )}
                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}
                        {!isLoading && !error && summaries.length === 0 && (
                            <p className="text-sm text-gray-500">No summaries yet.</p>
                        )}
                        <ul className="divide-y divide-gray-200">
                            {summaries.map((item) => (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedSummary(item)}
                                        className={`w-full text-left px-3 py-2 hover:bg-white rounded-md transition ${selectedSummary?.id === item.id ? "bg-white border border-gray-200" : ""}`}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900 truncate">
                                                {item.title || item.file_name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(item.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="mt-2 p-6 bg-gray-50 rounded-lg border min-h-[300px]">
                        {selectedSummary ? (
                            <div className="prose max-w-none">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {selectedSummary.title || selectedSummary.file_name}
                                </h3>
                                <div className="text-xs text-gray-500 mb-4">
                                    Generated at {new Date(selectedSummary.created_at).toLocaleString()}
                                </div>
                                <div className="whitespace-pre-wrap text-sm leading-6 text-gray-800">
                                    {selectedSummary.summary_text}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Select a summary to view its details.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
