

var express = require("express");
var router = express.Router();
const db = require("../model/helper.js");


/*     -----     FUNCTIONS     -----     */


function selectAllItems(req, res) {
  db("SELECT * FROM projects ORDER BY id ASC;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err))
}


/*     -----     GET     -----     */


// send message when api is accessed
router.get("/", (req, res) => {
  res.send("welcome to the api!")
});

// send back full list of items
router.get("/projects", (req, res) => {
  selectAllItems(req, res)
});

//send back video tutorials from db
router.get ("/tutorials", (req,res) =>{
  selectAllItems(req,res)
});

/*     -----     POST     -----     */


router.post("/projects", async (req, res) => {
  let newProj = req.body;
  try {
    await db(`INSERT INTO projects (title, designer, yarn, needles, start, end, completed, img) VALUES (
      "${newProj.title}", 
      "${newProj.designer}", 
      "${newProj.yarn}", 
      "${newProj.needles}", 
      "${newProj.start}", 
      "${newProj.end}", 
      ${newProj.completed},
      "${newProj.img}"
    );`)
    //TODO: add image 
    selectAllItems(req, res)
  } catch(err) {
    res.status(500).send(err)
  }
});


/*     -----     PUT     -----     */


router.put("/projects/:projects_id", async (req, res) => {
  try {
    await db(`UPDATE projects SET 
    title = "${newproj.title}", 
    designer = "${newproj.designer}", 
    yarn = "${newproj.yarn}", 
    needles = "${newproj.needles}", 
    start = "${newproj.start}", 
    end = "${newproj.end}", 
    completed = ${newproj.completed}, 
    img = "${newproj.img}"
    WHERE id = ${req.params.projects_id};`);
    selectAllItems(req, res);
  } catch(err) {
    res.status(500).send(err)
  }
});


/*     -----     DELETE     -----     */


router.delete("/projects/:projects_id", async (req, res) => {
  try {
    await db(`DELETE FROM projects WHERE id = ${req.params.projects_id};`);
    selectAllItems(req, res);
  } catch(err) {
    req.status(500).send(err)
  }
});


module.exports = router;