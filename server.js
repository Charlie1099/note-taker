const express = require("express")
const { notes } = require("./data/notes.json");
const fs = require("fs")
const path = require("path")

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
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, "./data/notes.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    )

    return note;
}

function validateNote(note) {
    if (!note.discription || typeof note.discription !== "string") {
        return false;
    }
    if (!note.task || typeof note.task !== "string") {
        return false;
    }
    
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
    req.body.id = notes.length.toString()

    if (!validateNote(req.body)) {
        res.status(400).send("The note is not properly formatted.")
    } else {
     const note = createNewNote(req.body, notes)
     res.json(req.body);   
    }
    
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})