const mongoose = require("mongoose");

// Define user schema
const NoteSchema = new mongoose.Schema({
    snippets: [String]
});

// Export schema
module.exports = mongoose.model("Note", NoteSchema);