// ============================================
// api/chat.js - FOR VERCEL DEPLOYMENT ONLY
// ============================================
// Place this file at: api/chat.js (in api folder)
// This is a Vercel Serverless Function
// Automatically runs on Vercel at /api/chat
// NOT used in local development
// ============================================

import { GoogleGenerativeAI } from "@google/generative-ai";
import { randomUUID } from "node:crypto";
import process from "node:process";

let requestCounts = new Map();

const MAX_MESSAGE_LENGTH = 2000;

function getAllowedOrigins(req) {
  const configuredOrigins = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean);

  const host = req.headers.host;
  const forwardedProto = req.headers["x-forwarded-proto"];
  const protocol = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto || "https";
  const sameOrigin = host ? `${protocol}://${host}` : null;

  return new Set([sameOrigin, ...configuredOrigins].filter(Boolean));
}

function applyCors(req, res) {
  const origin = req.headers.origin;

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (!origin) {
    return true;
  }

  if (getAllowedOrigins(req).has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    return true;
  }

  return false;
}

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  return (ip || req.socket.remoteAddress || "unknown").split(",")[0].trim();
}

function getRequestId(req) {
  const requestId = req.headers["x-vercel-id"] || req.headers["x-request-id"];
  return Array.isArray(requestId) ? requestId[0] : requestId || randomUUID();
}

function getSafeErrorCode(error) {
  if (error?.status === 429) return "PROVIDER_RATE_LIMITED";
  if (error?.status >= 400 && error?.status < 500) return "PROVIDER_REQUEST_REJECTED";
  return "PROVIDER_REQUEST_FAILED";
}

export default async function handler(req, res) {
  const requestId = getRequestId(req);
  const corsAllowed = applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(corsAllowed ? 204 : 403).end();
    return;
  }

  if (!corsAllowed) {
    return res.status(403).json({ error: "Origin is not allowed" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.headers["content-type"]?.includes("application/json")) {
    return res.status(415).json({ error: "Content-Type must be application/json" });
  }

  if (!req.headers["user-agent"]) {
    return res.status(403).json({ error: "Request rejected" });
  }

  // -----------------------------
  // Rate limiting logic
  // -----------------------------
  
  const ip = getClientIp(req);
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
    
    if (typeof message !== "string" || !message.trim()) {
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
    console.error("Gemini API error", {
      requestId,
      code: getSafeErrorCode(error),
    });
    return res.status(500).json({
      reply: "Sorry, something went wrong while connecting to Gemini.",
      requestId,
    });
  }
}
