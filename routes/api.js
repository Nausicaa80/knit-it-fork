require('dotenv').config(); // Load environment variables

const express = require("express");
const router = express.Router();
const db = require("../model/helper.js");
const { google } = require('googleapis');

/* ----- FUNCTIONS ----- */

function selectAllItems(req, res) {
  db("SELECT * FROM projects ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}

/* ----- GET ----- */

// send message when api is accessed
router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// send back full list of items
router.get("/projects", (req, res) => {
  selectAllItems(req, res);
});

//YouTube Data API client 
const youtube = google.youtube({
  version: 'v3',
  auth:'AIzaSyAFCOhv0O78RmFUoKyJHiT6KYRJczJGvrA', // Access API key from environment variables
});

// Fetch videos from the YouTube Data API
router.get("/tutorials", async (req, res) => {
  try {
    // Array to store video information
    const videoInfoArray = [];

    // Fetch information for each video
    const videos = await db("SELECT * FROM tutorials;");
    for (const video of videos.data) {
      const response = await youtube.videos.list({
        part: 'snippet',
        id: video.youtubeId,
      });
      const videoInfo = response.data.items[0].snippet;
      videoInfoArray.push({
        title: video.title,
        url: video.url,
        thumbnail: videoInfo.thumbnails.default.url
      });
    }

    // Send the video data to the client
    res.json(videoInfoArray);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
