var express = require("express");
var router = express.Router();
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
  res.send("welcome to the api!");
});

// send back full list of items
router.get("/projects", (req, res) => {
  selectAllItems(req, res);
});

// Initialize the YouTube Data API client
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyAFCOhv0O78RmFUoKyJHiT6KYRJczJGvrA',
});

// Fetch videos from the database
router.get("/tutorials", async (req, res) => {
  try {
    const sql = 'SELECT * FROM tutorials';
    const result = await db.query(sql);

    // Extract video IDs from the database result
    const videoIds = result.map(video => video.id);

    // Fetch additional video information from YouTube Data API
    const response = await youtube.videos.list({
      part: 'snippet',
      id: videoIds.join(','), // Convert array of video IDs to a comma-separated string
    });

    // Send the video data to the client
    res.json(response.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/* ----- POST ----- */

router.post("/projects", async (req, res) => {
  let newProject = req.body;
  try {
    await db(`INSERT INTO projects (title, designer, yarn, needles, start, end, img) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
      newProject.title,
      newProject.designer,
      newProject.yarn,
      newProject.needles,
      newProject.start,
      newProject.end,
      newProject.img
    ]);
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* ----- PUT ----- */

router.put("/projects/:projects_id", async (req, res) => {
  let updatedProject = req.body;
  try {
    await db(`UPDATE projects SET 
      title = ?, 
      designer = ?, 
      yarn = ?, 
      needles = ?, 
      start = ?, 
      end = ?, 
      completed = ?, 
      img = ?
      WHERE id = ?`, [
      updatedProject.title,
      updatedProject.designer,
      updatedProject.yarn,
      updatedProject.needles,
      updatedProject.start,
      updatedProject.end,
      updatedProject.completed,
      updatedProject.img,
      req.params.projects_id
    ]);
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* ----- DELETE ----- */

router.delete("/projects/:projects_id", async (req, res) => {
  try {
    await db(`DELETE FROM projects WHERE id = ?`, [req.params.projects_id]);
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;