// // Using Gemeni 2.5 Flash model from Google Generative AI

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) return res.status(400).json({ error: "Message is required" });

//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const result = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: message }],
//         },
//       ],
//     });

//     const reply =
//       result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     res.json({ reply });
//   } catch (err) {
//     console.error("Gemini API Error:", err);
//     res.status(500).json({ error: "API Error" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
