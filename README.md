Jelal - AI-Powered PDF Summarization


Turn confusing corporate papers into clear summaries in seconds 🚀
Jelal is a modern web application that leverages AI to instantly distill complex PDF documents into easy-to-digest summaries with synonym normalization. Built with Next.js and powered by Google's Gemini AI, it transforms lengthy corporate documents into clear, actionable insights.

✨ Features
�� PDF Upload: Drag and drop or click to upload PDF documents (up to 20MB)
�� AI Analysis: Advanced AI processing using Google Gemini 2.5 Flash model
📝 Smart Summaries: Generate clear, concise summaries with contextually relevant emojis and proper markdown formatting
👤 User Authentication: Secure user management with Clerk
💾 Summary Storage: Save and manage your document summaries in a PostgreSQL database
📱 Responsive Design: Beautiful, modern UI that works on all devices
⚡ Fast Processing: Real-time document processing with fallback mechanisms

🛠️ Tech Stack
Frontend: Next.js 15, React 19, TypeScript
Styling: Tailwind CSS, Radix UI components
Authentication: Clerk
Database: PostgreSQL (Neon)
AI: Google Generative AI (Gemini 2.5 Flash)
PDF Processing: LangChain, PDF.js
File Upload: UploadThing
Deployment: Vercel-ready

📖 How It Works
Upload: Simply drag and drop your PDF document or click to upload
AI Analysis: Our advanced AI processes and analyzes your document instantly
Get Summary: Receive a clear, concise summary of your document

�� API Endpoints
POST /api/upload - Upload and process PDF documents
GET /api/summaries - Retrieve user's summaries
GET /api/summaries/[id] - Get specific summary by ID

�� Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

�� License
This project is licensed under the MIT License.

Built with ❤️ using Next.js and Google Gemini AI
