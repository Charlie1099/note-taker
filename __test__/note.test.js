const fs = require("fs")
const {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
} = require("../lib/notes")
const { notes } = require("../data/notes.json");

jest.mock("fs")

test("creates a note object", () => {
    const note = createNewNote(
        { task: "Go shopping", id: "sefsefs5" },
        notes
    );

    expect(note.task).toBe("Go shopping")
    expect(note.id).toBe("sefsefs5")
});

test("filters by query", () => {
    const startingNotes = [
        {
            "id": "2",
            "task": "Feed dog",
            "discription": "feed the dog at hollys"
          },
          {
            "id": "3",
            "task": "Do School Challange",
            "discription": "work on challange for 2 hurs"
          },
    ];


const updatedNotes = filterByQuery({ task: "Feed dog" }, startingNotes)

expect(updatedNotes.length).toEqual(1)
});

test("finds by id", () => {
    const startingNotes = [
        {
            "id": "2",
            "task": "Feed dog",
            "discription": "feed the dog at hollys"
          },
          {
            "id": "3",
            "task": "Do School Challange",
            "discription": "work on challange for 2 hurs"
          },
    ];

    const results = findById("3", startingNotes)

    expect(results.task).toBe("Do School Challange")
});

test("validates discription", () => {
    const note = {
        
            "id": "2",
            "task": "Feed dog",
            "discription": "feed the dog at hollys"
          }

const invalidNote = {
            "id": "3",
            "task": "Do School Challange",
            
          };

          const result = validateNote(note)
          const result2 = validateNote(invalidNote)

          expect(result).toBe(true);
          expect(result2).toBe(false)
    
})

