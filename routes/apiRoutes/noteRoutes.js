const router = require("express").Router()
const { filterByQuery, findById, createNewNote, validateNote } = require("../../lib/notes")
const { notes } = require("../../db/db.json")
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
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
  });


  router.post("/notes", (req, res) => {

    const newNote = req.body;

    if (notes.length === 0){newNote.id = 1} 
      else {
      newNote.id = (notes[notes.length-1].id + 1);
    }
    notes.push(newNote);

    const jsonNotes = JSON.stringify(notes)

    fs.writeFile("./db/db.json", jsonNotes, function(error) {
      if (error) {
        return console.log(error);
      }
      console.log("New note created");
    })
    res.json(notes)
  })
  
router.delete("/db/:id", (req, res) => {
  const noteId = req.params.id;

  notes.forEach((n, index) => {
    if(noteId == n.id){notes.splice(index,1)

      const notesCopy = notes.slice();
      
      const jsonNotes = JSON.stringify(notesCopy)

      fs.writeFile("./db/db.json", jsonNotes, function(error) {
        if (error) {
          return console.log(error);
        }
        console.log("Note Deleted");
      })

    }
  })
  res.json(notes);
})

module.exports = router