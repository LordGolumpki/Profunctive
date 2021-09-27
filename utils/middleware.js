const { boardNameSchema, noteSchema } = require("./joiSchemas");
const ExpressError = require("./ExpressError");

module.exports.validateBoardName = (req, res, next) => {
    const { error } = boardNameSchema.validate(req.body);
    console.log(error)
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateNote = (req, res, next) => {
    const { error } = noteSchema.validate(req.body);
    console.log(error)
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isSignedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be signed in first!");
        return res.redirect("/signin");
    }
    next();
}