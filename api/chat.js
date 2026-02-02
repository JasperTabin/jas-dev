// ============================================
// api/chat.js - FOR VERCEL DEPLOYMENT ONLY
// ============================================
// Place this file at: api/chat.js (in api folder)
// This is a Vercel Serverless Function
// Automatically runs on Vercel at /api/chat
// NOT used in local development
// ============================================

import { GoogleGenerativeAI } from "@google/generative-ai";

let requestCounts = new Map();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // -----------------------------
  // Rate limiting logic
  // -----------------------------
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const now = Date.now();
  const windowMs = 60 * 1000; 
  const maxRequests = 5;     

  requestCounts.forEach((timestamps, key) => {
    requestCounts.set(
      key,
      timestamps.filter(ts => now - ts < windowMs)
    );
  });

  const timestamps = requestCounts.get(ip) || [];
  if (timestamps.length >= maxRequests) {
    return res.status(429).json({ error: "Too many requests, please slow down." });
  }

  timestamps.push(now);
  requestCounts.set(ip, timestamps);

  // -----------------------------
  // Gemini API call
  // -----------------------------
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
}
