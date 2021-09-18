const User = require("../models/userModel");
const Note = require("../models/noteModel");

module.exports.updateBoardName = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newBoardName = req.body.newBoardName;
        const user = await User.findByIdAndUpdate(id, { boardName: newBoardName });
        await user.save();
    } catch (e) {
        console.log(e.message);
    }
}

module.exports.renderBoard = async (req, res, next) => {
    try {
        const id = req.user.id;
        let user = await User.findById(id);
        const noteIds = user.notes;
        user = await User.findById(id).populate("notes");
        const userInfo = {
            boardName: user.boardName,
            notes: user.notes,
            ids: noteIds
        }
        res.render("userPage.ejs", { userInfo });
    } catch (e) {
        req.flash("error", "Unable to load board");
        res.redirect("/signin");
    }
}

module.exports.createNote = async (req, res, next) => {
    try {
        const note = new Note([]);
        await note.save();
        const id = req.user.id;
        const user = await User.findById(id);
        user.notes.push(note._id);
        await user.save();
        res.json({ id: note._id });
    } catch (e) {
        console.log(e.message);
    }
}

module.exports.updateNotes = async (req, res, next) => {
    try {
        const noteId = req.body.note;
        const newSnippets = req.body.snippets;
        const note = await Note.findByIdAndUpdate(noteId, { snippets: newSnippets });
        await note.save();
    } catch (e) {
        console.log(e.message);
    }
}

module.exports.deleteNote = async (req, res, next) => {
    try {
        const id = req.user.id;
        const noteId = req.body.note;
        await User.findOneAndUpdate(id, { $pull: { notes: noteId } });
        await Note.findByIdAndRemove(noteId);
    } catch (e) {
        console.log(e.message);
    }
}