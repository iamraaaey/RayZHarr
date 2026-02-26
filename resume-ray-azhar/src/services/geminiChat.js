const SESSION_ID = globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
const API_BASE = import.meta.env.DEV ? "/api" : "http://localhost:3001/api";

export async function sendMessage(userMessage) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage, sessionId: SESSION_ID }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Chat API error:", res.status, errorText);
    throw new Error("Failed to get response from chatbot");
  }

  const data = await res.json();
  return data.answer;
}

export async function resetChat() {
  await fetch(`${API_BASE}/chat/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: SESSION_ID }),
  });
}
