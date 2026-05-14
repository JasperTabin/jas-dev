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
import { randomUUID } from 'node:crypto';
import process from 'node:process';

dotenv.config();

const app = express();

const MAX_MESSAGE_LENGTH = 2000;
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean),
]);

function getSafeErrorCode(error) {
  if (error?.status === 429) return 'PROVIDER_RATE_LIMITED';
  if (error?.status >= 400 && error?.status < 500) return 'PROVIDER_REQUEST_REJECTED';
  return 'PROVIDER_REQUEST_FAILED';
}

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin is not allowed'));
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '4kb' }));

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
  const requestId = randomUUID();

  try {
    const { message } = req.body;
    
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(413).json({ error: "Message is too long" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return res.status(200).json({ reply });
    
  } catch (error) {
    console.error('Gemini API error', {
      requestId,
      code: getSafeErrorCode(error),
    });
    return res.status(500).json({
      reply: "Sorry, something went wrong while connecting to Gemini.",
      requestId,
    });
  }
});

app.use((error, req, res, next) => {
  const requestId = randomUUID();

  if (res.headersSent) {
    return next(error);
  }

  if (error?.message === 'Origin is not allowed') {
    return res.status(403).json({ error: 'Origin is not allowed', requestId });
  }

  console.error('API middleware error', {
    requestId,
    code: 'REQUEST_REJECTED',
  });

  return res.status(400).json({ error: 'Bad request', requestId });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Local API server running on http://localhost:${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🔑 Using GEMINI_API_KEY from .env file`);
});
