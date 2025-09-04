'use client';

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatePDFSummary } from "@/actions/upload-actions";
import { useRef } from "react";
import { useState } from "react";

const schema = z.object({
    file: z.instanceof(File, {message: 'Invalid file'}).refine((file)=>file.size <=20*1024*1024, {
        message: 'FIle size must be less than 20MB',
    })
    .refine((file)=> file.type.startsWith('application/pdf'), 'File size must be a PDF')
});

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading ] = useState(false);

    const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
        onClientUploadComplete: () => {
            console.log('upload success!');
        },
        onUploadError: (err) => {
            console.log('error occured while uploading.', err);
            toast.error('Error occurred while uploading', {
                description: err.message,
            })
        },
        onUploadBegin: (file) => {
            console.log('Upload has begun for', file);
        },
    });
    
    const  handleSubmit = async(e: React.FormEvent <HTMLFormElement>) => {
        e.preventDefault();

        try{
            setIsLoading(true);
            const formData = new FormData(e.currentTarget);
                    const file = formData.get('file') as File; 

                    const validatedFields = schema.safeParse({ file });
                    if (!validatedFields.success) {
                        const firstIssue = validatedFields.error.issues?.[0];
                        toast.error(
                            'Something went wrong.', {
                                description: firstIssue?.message ?? 'Invalid File',
                            }
                        )
                        setIsLoading(false);
                        return;
                    }

                    toast("The document is being uploaded.")
                    // Kick off upload
                    void startUpload([file]);

                const resp = await startUpload([file]);
                if (!resp) {
                    toast(
                        "Something went wrong. Please use a different file."
                    );
                    return;
                }

                toast("Hang tight! Our AI is reading through your document.");

                const result = await generatePDFSummary(resp);

                const {data=null, message=null} = result || {};
                if (data) {
                    toast("Hang tight! We are saving your summary!");
                    formRef.current?.reset();
                    if (data.summary) {
                        
                    }
                }            
        } catch(error) {
            setIsLoading(false);
            console.log("Error occured", error);
            formRef.current?.reset();
        }

    }
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>
        </div>
    )
}