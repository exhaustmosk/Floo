// huggingface.js
import fetch from "node-fetch";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

// 🔑 Your Hugging Face API key from environment
const HF_API_KEY = process.env.HUGGINGFACE_TOKEN;

if (!HF_API_KEY) {
  throw new Error("HUGGINGFACE_TOKEN is not set in .env file");
}

const HF_API_URL =
  "https://api-inference.huggingface.co/models/finiteautomata/bertweet-base-sentiment-analysis";

export async function analyzeText(text) {
  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Hugging Face API error: ${response.status} ${response.statusText} - ${errorDetails}`
      );
    }

    const result = await response.json();

    // 🔹 Normalize: always return single {label, score}
    if (Array.isArray(result)) {
      if (Array.isArray(result[0])) {
        const sorted = result[0].sort((a, b) => b.score - a.score);
        return { label: sorted[0].label, score: sorted[0].score };
      }
      if (result[0].label && result[0].score !== undefined) {
        const sorted = result.sort((a, b) => b.score - a.score);
        return { label: sorted[0].label, score: sorted[0].score };
      }
    }

    if (result.label && result.score !== undefined) {
      return { label: result.label, score: result.score };
    }

    throw new Error("Unexpected API response structure");

  } catch (err) {
    console.error("Error in analyzeText:", err.message);
    throw err;
  }
}
