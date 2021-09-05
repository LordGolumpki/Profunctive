const User = require("../models/userModel");

module.exports.updateBoardName = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newBoardName = req.body.newBoardName;
        const user = await User.findByIdAndUpdate(id, { boardName: newBoardName });
        await user.save();
    } catch (e) {
        // Do nothing
    }
}

module.exports.renderBoard = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        const userInfo = {
            boardName: user.boardName,
            notes: user.notes
        }
        res.render("userPage.ejs", { userInfo });
    } catch (e) {
        console.log(e)
        req.flash("error", "Unable to load board");
        res.redirect("/signin");
    }
}