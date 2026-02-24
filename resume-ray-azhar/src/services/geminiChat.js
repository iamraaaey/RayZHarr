import { GoogleGenerativeAI } from '@google/generative-ai';
import { persons } from '../data/persons';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Build context string from persons data
function buildPersonContext(person) {
    const skills = person.skillCategories
        .map((cat) => `${cat.label}: ${cat.skills.map((s) => `${s.name} (${s.level}%)`).join(', ')}`)
        .join('\n');

    const experiences = person.experiences
        .map((exp) => `${exp.role} at ${exp.company} (${exp.period}) — ${exp.highlights.join('; ')}`)
        .join('\n');

    const education = person.education
        .map((edu) => `${edu.degree} at ${edu.institution} (${edu.period})${edu.gpa ? ` GPA: ${edu.gpa}` : ''} — ${edu.highlights.join('; ')}`)
        .join('\n');

    const achievements = person.achievements
        .map((a) => `${a.title}: ${a.desc}`)
        .join('\n');

    return `
## ${person.name}
- Role: ${person.role} | Title: ${person.title}
- University: ${person.university}
- Location: ${person.location}
- Bio: ${person.bio}
- Email: ${person.email} | Phone: ${person.phone}
- LinkedIn: ${person.linkedin}
- GitHub: ${person.github}
- Stats: ${person.stats.map((s) => `${s.value} ${s.label}`).join(', ')}

### Skills
${skills}
Soft Skills: ${person.softSkills.join(', ')}

### Experience
${experiences}

### Education
${education}

### Achievements
${achievements}
`.trim();
}

const SYSTEM_PROMPT = `You are a friendly portfolio assistant chatbot for a software engineering internship portfolio website. You know everything about the two interns featured on this site.

Here is their complete information:

${Object.values(persons).map(buildPersonContext).join('\n\n---\n\n')}

Guidelines:
- Answer questions about Raynold and Azhar's skills, experience, education, projects, and achievements.
- Be friendly, concise, and helpful. Keep responses short (2-4 sentences) unless the user asks for details.
- If asked about something outside the portfolio data, politely redirect to portfolio-related topics.
- You can compare the two interns when asked.
- Use their first names (Raynold, Azhar) when referring to them.
- If the user greets you, introduce yourself briefly and suggest what you can help with.`;

let chat = null;

function getChat() {
    if (!chat) {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        chat = model.startChat({
            history: [],
            systemInstruction: SYSTEM_PROMPT,
        });
    }
    return chat;
}

export async function sendMessage(userMessage) {
    const chatSession = getChat();
    const result = await chatSession.sendMessage(userMessage);
    return result.response.text();
}

export function resetChat() {
    chat = null;
}
