'use client';

import UploadFormInput from "./upload-form-input";
import { toast } from "sonner";

import { useRef } from "react";
import { useState } from "react";

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState<string>("");
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setSummary("");
            
            const formData = new FormData(e.currentTarget);
            const file = formData.get('file') as File; 

            // Basic client-side validation
            if (!file || file.type !== "application/pdf") {
                toast.error('Validation failed', {
                    description: 'Only PDF files are accepted',
                });
                setIsLoading(false);
                return;
            }

            if (file.size > 20 * 1024 * 1024) {
                toast.error('Validation failed', {
                    description: 'File size must be less than 20MB',
                });
                setIsLoading(false);
                return;
            }

            // Call the API endpoint
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            let result;
            try {
                result = await response.json();
            } catch (jsonError) {
                throw new Error('Server returned invalid response');
            }

            if (!response.ok) {
                throw new Error(result.error || 'Upload failed');
            }

            setSummary(result.summary);
            toast.success('Document processed successfully!');
            formRef.current?.reset();
            
        } catch(error) {
            console.error("Error occurred", error);
            toast.error('Processing failed', {
                description: error instanceof Error ? error.message : 'Something went wrong',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>
            
            {summary && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Normalization Summary</h3>
                    <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br>') }}
                    />
                </div>
            )}
        </div>
    )
}