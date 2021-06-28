const User = require("../models/userModel");

module.exports.renderSignUp = (req, res) => {
    res.render("signUp");
}

module.exports.signUp = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Profunctive!");
            res.redirect("/board");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderSignIn = (req, res) => {
    res.render("signIn");
}

module.exports.signIn = (req, res) => {
    res.redirect("/board");
}

module.exports.signOut = (req, res) => {
    req.logout();
    req.session.destroy();
    req.flash("success", "Successfully signed out!");
    res.redirect("/home");
}