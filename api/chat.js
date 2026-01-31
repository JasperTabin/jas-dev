// api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function (req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }

  try {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", async () => {
      const { message } = JSON.parse(body || "{}");

      if (!message) {
        res.statusCode = 400;
        return res.end("Message is required");
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(message);
      const reply = result.response.text();

      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify({ reply }));
    });
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Server error");
  }
}
