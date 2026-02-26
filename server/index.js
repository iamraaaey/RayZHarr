// Load environment variables from .env file (e.g., GROQ_API_KEY, PORT)
import "dotenv/config";

// Express: web framework for creating the HTTP server and handling routes
import express from "express";

// CORS: middleware that allows the frontend (different origin) to call this API
import cors from "cors";

// loadResumeText: reads PDF resumes and extracts their text content
import { loadResumeText } from "./rag/ingest.js";

// buildChat: creates the LangGraph chatbot using the extracted resume text
import { buildChat } from "./rag/graph.js";

// createChatRouter: creates Express routes for the chat API endpoints
import { createChatRouter } from "./routes/chat.js";

// Create an Express application instance
const app = express();

// Use PORT from .env or default to 3001
const PORT = process.env.PORT || 3001;

// Enable CORS so the frontend (running on a different port) can make API requests
app.use(cors());

// Parse incoming JSON request bodies (needed for reading req.body)
app.use(express.json());

// Async startup function — initializes the chatbot and starts the server
async function start() {
  // Step 1: Extract text from all resume PDFs in the resume directory
  const resumeText = await loadResumeText();

  // Step 2: Build the LangGraph chatbot with the resume text baked into its system prompt
  const chat = buildChat(resumeText);

  // Step 3: Create the chat API routes and mount them on the Express app
  app.use(createChatRouter(chat));

  // Step 4: Start listening for incoming HTTP requests
  app.listen(PORT, () => {
    console.log(`Server running on :${PORT}`);
  });
}

// Run the startup function and handle any fatal errors
start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
