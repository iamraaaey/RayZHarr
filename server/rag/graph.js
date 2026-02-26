// StateGraph: the core LangGraph class that lets us define a graph of nodes and edges
// Annotation: used to define the shape/schema of the graph's state
// MessagesAnnotation: a built-in annotation that provides a "messages" array in state
import { StateGraph, Annotation, MessagesAnnotation } from "@langchain/langgraph";

// MemorySaver: an in-memory checkpointer that saves conversation history between requests
// This allows the chatbot to "remember" previous messages in a session
import { MemorySaver } from "@langchain/langgraph";

// ChatGroq: LangChain wrapper for calling Groq's API (which hosts fast LLM inference)
import { ChatGroq } from "@langchain/groq";

// SystemMessage: a message type that sets the AI's behavior/instructions
import { SystemMessage } from "@langchain/core/messages";

// SYSTEM_TEMPLATE: the prompt template with a {context} placeholder for resume text
import { SYSTEM_TEMPLATE } from "./prompts.js";

// Define the graph's state schema by extending MessagesAnnotation
// This gives our graph a "messages" array that automatically accumulates messages
const GraphState = Annotation.Root({
  ...MessagesAnnotation.spec,
});

// buildChat: creates and returns a compiled LangGraph chatbot
// resumeText: the extracted text from the PDF resumes, injected into the system prompt
export function buildChat(resumeText) {
  // Replace the {context} placeholder in the prompt template with actual resume text
  const systemContent = SYSTEM_TEMPLATE.replace("{context}", resumeText);

  // Create a SystemMessage that will be prepended to every conversation
  // This tells the AI who it is and gives it the resume data to reference
  const systemMessage = new SystemMessage(systemContent);

  // Initialize the Groq LLM client with the llama-3.3-70b model
  // temperature: 0.3 keeps responses fairly focused and consistent (lower = less random)
  const model = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
  });

  // The "generate" node function — this is the only node in our graph
  // It receives the current state (which contains the conversation messages)
  // and returns the AI's response to be appended to the messages array
  async function generate(state) {
    // Call the LLM with: system message first, then all conversation messages
    const response = await model.invoke([systemMessage, ...state.messages]);
    // Return the response wrapped in a messages array — LangGraph will merge it into state
    return { messages: [response] };
  }

  // Build the graph structure:
  const graph = new StateGraph(GraphState)
    .addNode("generate", generate) // Register the "generate" function as a node
    .addEdge("__start__", "generate") // When the graph starts, go to "generate" node
    .addEdge("generate", "__end__"); // After "generate" runs, end the graph

  // Create an in-memory checkpointer to persist conversation state between API calls
  // Each unique thread_id gets its own saved conversation history
  const checkpointer = new MemorySaver();

  // Compile the graph with the checkpointer — this produces a runnable object
  // that can be invoked with messages and will automatically save/load conversation state
  const compiled = graph.compile({ checkpointer });

  return compiled;
}
