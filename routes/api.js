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
  auth: process.env.AIzaSyAFCOhv0O78RmFUoKyJHiT6KYRJczJGvrA, // Access API key from environment variables
});

// Fetch videos from the database
router.get("/tutorials", async (req, res) => {
  try {
    // Array to store video information
    const videoInfoArray = [];

    // Define video titles and IDs
    const videos = [
      { title: 'Knitting for Beginners', id: 'hM5M2Fu0RtY' },
      { title: 'How to PURL STITCH for Total Beginners', id: '7ePhLqw6HDM' },
      { title: 'Continental Knitting Two Ways', id: 'q92bAeVFdao' }
    ];

    // Fetch information for each video
    for (const video of videos) {
      const response = await youtube.videos.list({
        part: 'snippet',
        id: video.id,
      });
      const videoInfo = response.data.items[0].snippet;
      videoInfoArray.push({
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
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