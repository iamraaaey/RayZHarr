// Router: Express utility to create modular route handlers
import { Router } from "express";

// HumanMessage: a message type representing what the user typed
import { HumanMessage } from "@langchain/core/messages";

// Create an Express router instance for our chat endpoints
const router = Router();

// Factory function that takes the compiled LangGraph and returns a router with chat routes
// ragGraph: the compiled LangGraph chatbot instance created by buildChat()
export function createChatRouter(ragGraph) {

  // POST /api/chat — handles incoming user messages and returns AI responses
  router.post("/api/chat", async (req, res) => {
    try {
      // Extract the user's message and sessionId from the request body
      // sessionId defaults to "default" if not provided — used to track separate conversations
      const { message, sessionId = "default" } = req.body;

      // Validate that a message was provided
      if (!message) {
        return res.status(400).json({ error: "message is required" });
      }

      // Config object that tells LangGraph which conversation thread to use
      // thread_id maps to the checkpointer — each unique ID has its own saved message history
      const config = { configurable: { thread_id: sessionId } };

      // Invoke the LangGraph with the user's message
      // LangGraph will automatically:
      //   1. Load previous messages for this thread_id from the checkpointer
      //   2. Append the new HumanMessage to the state
      //   3. Run the "generate" node (which calls the Groq LLM)
      //   4. Save the updated state (including the AI's response) back to the checkpointer
      const result = await ragGraph.invoke(
        { messages: [new HumanMessage(message)] },
        config
      );

      // The result contains all messages in the conversation
      // We grab the last one — that's the AI's new response
      const lastMessage = result.messages[result.messages.length - 1];

      // Send the AI's response text back to the client
      res.json({ answer: lastMessage.content });
    } catch (err) {
      console.error("Chat error:", err);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // POST /api/chat/reset — clears conversation history for a given session
  router.post("/api/chat/reset", async (req, res) => {
    const { sessionId = "default" } = req.body;
    const config = { configurable: { thread_id: sessionId } };
    try {
      // Clear the conversation by overwriting the checkpoint state with an empty messages array
      // This effectively "resets" the chatbot's memory for this session
      await ragGraph.updateState(config, { messages: [] });
    } catch {
      // If the thread doesn't exist yet (no prior messages), that's fine — nothing to clear
    }
    res.json({ success: true });
  });

  return router;
}
