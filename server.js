// ============================================
// server.js - FOR LOCAL DEVELOPMENT ONLY
// ============================================
// Place this file at ROOT of your project
// Run with: npm run api
// This file is NOT deployed to Vercel
// ============================================

//  Uses express-rate-limit

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// -----------------------------
// Rate limiting Logic
// -----------------------------

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,             
  message: { error: "Too many requests, please slow down." },
});

app.use('/api/chat', limiter);

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // eslint-disable-next-line no-undef
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return res.status(200).json({ reply });
    
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      reply: "Sorry, something went wrong while connecting to Gemini.",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Local API server running on http://localhost:${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🔑 Using GEMINI_API_KEY from .env file`);
});
