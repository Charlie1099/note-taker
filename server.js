const express = require("express")
const { notes } = require("./data/notes.json");

const PORT = process.env.PORT || 3001

//express and the middleware
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

function createNewNote(body, notesArray) {
    console.log(body);

    return body;
}

app.get("/api/notes", (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results)
});

app.get("/api/notes/:id", (req, res) => {
    const result = findById(req.params.id, notes);
    if(result) {
      res.json(result);  
    } else {
        res.send(404)
    }
});

app.post("/api/notes", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})