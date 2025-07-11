const axios = require("axios");
const express = require("express");
const Router = express.Router();
const { getYoutubeComments } = require("../services/youtubeService");
require("dotenv").config();

Router.get("/comments/:videoId", async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const comments = await getYoutubeComments(videoId);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to get comments" });
  }
});

Router.get("/analyze/:videoId", async (req, res) => {
  const videoId = req.params.videoId;

  try {
    const comments = await getYoutubeComments(videoId);

    // Send each comment to the Flask API
    const analyzed = await Promise.all(
      comments.map(async (comment) => {
        try {
          const response = await axios.post("http://localhost:5000/predict", {
            text: comment.return || comment,
          });

          return {
            comment,
            prediction: response.data.prediction,
            confidence: response.data.confidence,
          };
        } catch (error) {
          console.error("ML API error:", error.message);
          return {
            comment,
            error: "Prediction failed",
          };
        }
      })
    );

    res.status(200).json(analyzed);
  } catch (error) {
    console.error("Analyze error:", error.message);
    res.status(500).json({ error: "Failed to analyze comments" });
  }
});

module.exports = Router;
