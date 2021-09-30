const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    snippets: [String]
});

module.exports = mongoose.model("Note", NoteSchema);