import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// simple in-memory rate limit (portfolio-safe)
let lastRequestTime = 0;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const now = Date.now();
  if (now - lastRequestTime < 1500) {
    return res.status(429).json({ error: "Too many requests" });
  }
  lastRequestTime = now;

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: "Message too long" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(message);

    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Internal error" });
  }
}
