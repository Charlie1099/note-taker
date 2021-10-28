//dependencies
const fs = require("fs");
const path = require("path")


function filterByQuery(query, notesArray) {
    let taskArray = []
    let filteredResults = notesArray;
    if (query.task) {
        if (typeof query.task === "string") {
            taskArray = [query.task]
        } else {
            taskArray = query.task
        }
        taskArray.forEach(task => {
            filteredResults = filteredResults.filter(
                note => note.task.indexOf(task) !== -1
            )
            
        });
        
    }
    if (query.discription) {
        filteredResults = filteredResults.filter(note => note.discription === query.discription)
    }
    return filteredResults
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../data/notes.json"),
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
    return true
}


module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
  };
