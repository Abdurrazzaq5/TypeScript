import { createUploadthing, UploadThingError, type FileRouter } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({pdf: {maxFileSize: '32MB'}})
    .middleware(async ({req}) => {
            const user = await currentUser();

            if(!user) throw new UploadThingError('Unauthorized');

            // Return metadata for downstream usage
            return { userId: user.id };
        }
    ).onUploadComplete(async ({metadata, file}) => {
        console.log('upload completed for user id', metadata.userId);
        console.log('file key', file.key);
        // Return JSON-serializable data matching upload-actions.ts expectations
        return { 
            userId: metadata.userId, 
            file: {
                url: file.key, // Use key as URL identifier
                name: file.name
            }
        };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;