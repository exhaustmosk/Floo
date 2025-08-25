// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { analyzeText } from "./huggingface.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Sentiment analysis route
app.post("/api/analyze", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    // 🔹 analyzeText now always returns {label, score}
    const result = await analyzeText(text);

    if (!result || !result.label || result.score === undefined) {
      return res.status(500).json({
        error: "Invalid API response",
        raw: result,
      });
    }

    res.json(result); // { label, score }
  } catch (err) {
    res.status(500).json({
      error: "Unexpected API error",
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
