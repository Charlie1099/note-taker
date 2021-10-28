const router = require("express").Router()
const { filterByQuery, findById, createNewNote, validateNote } = require("../../lib/notes")
const { notes } = require("../../data/notes.json")
const fs = require("fs")
const path = require("path")

router.get("/notes", (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
     let results = notes;
    const result = findByTitle(req.params.id, notes);
    if (result) {
      res.json(results);
    } else {
      res.send(404);
    }
  });


router.post('/notes', (req, res) => {
   
    req.body.id = notes.length.toString();
  
    
    if (!validateNote(req.body)) {
      res.status(400).send('This note is not formatted right.');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
  });
  
// router.delete("/notes/:id", (req, res) => {
//     const result = findById(req.params.id, notes);
//     if(result) {
//       res.json(result);  
//     } else {
//         res.send(404)
//     }
// });
module.exports = router