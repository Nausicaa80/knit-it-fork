
var express = require("express");
var router = express.Router();
const db = require("../model/helper.js");

/* ----- FUNCTIONS ----- */


function selectAllItems(req, res) {
  db("SELECT * FROM projects ORDER BY id ASC;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
}




/* ----- GET ----- */

// Send message when API is accessed
router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Send back full list of items
router.get("/projects", (req, res) => {
  selectAllItems(req, res);
});

router.get ("/tutorials", (req,res)=> {
  selectAllItems(req,res);
});


/* ----- POST ----- */

router.post("/projects", async (req, res) => {
  let newProj = req.body;
  try {
    await db(
      `INSERT INTO projects (title, designer, yarn, needles, start, end, img) VALUES (
      "${newProj.title}", 
      "${newProj.designer}", 
      "${newProj.yarn}", 
      "${newProj.needles}", 
      "${newProj.start}", 
      "${newProj.end}", 
      "${newProj.img}"
    );`
    );
    // TODO: add image
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* ----- PUT ----- */

router.put("/projects/:projects_id", async (req, res) => {
  try {
    let updatedProj = req.body;
    await db(
      `UPDATE projects SET 
    title = "${updatedProj.title}", 
    designer = "${updatedProj.designer}", 
    yarn = "${updatedProj.yarn}", 
    needles = "${updatedProj.needles}", 
    start = "${updatedProj.start}", 
    end = "${updatedProj.end}", 
    img = "${updatedProj.img}"
    WHERE id = ${req.params.projects_id};`
    );
    selectAllItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* ----- DELETE ----- */

router.delete("/projects/:projects_id", async (req, res) => {
  try {
    await db(`DELETE FROM projects WHERE id = ${req.params.projects_id};`);
    selectAllItems(req, res);
  } catch (err) {
    req.status(500).send(err);
  }
});

module.exports = router;