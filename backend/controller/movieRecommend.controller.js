import { GoogleGenAI } from "@google/genai";
import Query from "../models/Query.model.js";

export const getRecommendations = async (req, res) => {
  try {
    const { preference } = req.body;

    if (!preference) {
      return res.status(400).json({ error: "Preference is required" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
      Recommend 5 movies for "${preference}".
      Only return titles, one per line.
    `;

    let response;

    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",  
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });
    } catch (err) {
      // If model is busy → return friendly message
      if (err.status === 503 || err?.error?.status === "UNAVAILABLE") {
        return res.status(503).json({
          error: "AI is currently busy. Please try again in a few seconds 🙏",
        });
      }
      throw err;
    }

    const rawText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!rawText) {
      return res
        .status(500)
        .json({ error: "AI returned no response. Try again shortly." });
    }

    const movies = rawText
      .split("\n")
      .map((m) => m.replace(/^\d+[\).\s-]*/, "").trim())
      .filter(Boolean);

    await Query.create({
      user_input: preference,
      recommended_movies: movies,
    });

    return res.status(200).json({ recommendations: movies });
  } catch (err) {
    console.error("GENAI ERROR:", err);
    return res.status(500).json({ error: "Something went wrong on our side 😔" });
  }
};
