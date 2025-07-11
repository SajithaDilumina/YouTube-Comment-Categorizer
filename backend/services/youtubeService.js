const axios = require("axios");
require("dotenv").config();

const getYoutubeComments = async (videoId) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/commentThreads",
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          part: "snippet",
          videoId: videoId,
          maxResults: 100,
          textFormat: "plainText",
        },
      }
    );
    const comments = response.data.items.map((item) => ({
      return: item.snippet.topLevelComment.snippet.textDisplay,
    }));
    return comments;
  } catch (error) {
    console.error("Error fetching YouTube comments:", error);
    throw error;
  }
};

module.exports = {
  getYoutubeComments,
};
