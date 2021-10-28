const path = require("path")
const router = require("express").Router()

//rout for the index.html
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});
// route for the notes.html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

//wildcard route
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"))
})

module.exports = router