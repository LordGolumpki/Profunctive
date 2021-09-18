/**
 * Author: Ivan Jones
 * Version: 9/18/21
 */

// Require .env variables if in development
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Import external modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Import internal modules
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const UserModel = require("./models/userModel");
const userController = require("./controllers/userController");
const boardController = require("./controllers/boardController");

// Define instance variables
const port = process.env.PORT || 8080;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/profunctive";
const secret = process.env.SECRET || "mangopanda";
const sessionConfig = {
    name: "session",
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

// Establish connection to mongo database
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

// Start express app
const app = express();

// Enable ejs partials to be read
app.engine("ejs", ejsMate);
// Enable express to parse url requests
app.use(express.urlencoded({ extended: true }));
// Enable express to parse json requests
app.use(express.json());
// Enable express to receive pseudo-requests
app.use(methodOverride("_method"));
// Enable ejs templates to be read
app.set("view engine", "ejs");
// Set the path for views directory
app.set("views", path.join(__dirname, "views"));
// Serve static assets
app.use(express.static(path.join(__dirname, "public")));
// Enable flash for messages
app.use(flash());
// Enable sessions
app.use(session(sessionConfig));
// Set up passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// Apply flash messages and user to the locals object
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Temp location
isSignedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/signin');
    }
    next();
}

// Define routes
// Home route
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Sign in routes
app.get("/signin", userController.renderSignIn);

app.post("/signin", passport.authenticate("local", { failureFlash: true, failureRedirect: "/signin" }), userController.signIn);

// Sign out route
app.get("/signout", userController.signOut);

// Sign up routes
app.get("/signup", userController.renderSignUp);

app.post("/signup", catchAsync(userController.signUp));

// User board routes
app.get("/board", isSignedIn, catchAsync(boardController.renderBoard));

app.post("/board/updatename/:id", catchAsync(boardController.updateBoardName));

app.post("/board/updatenote/:id", catchAsync(boardController.updateNotes));

app.post("/board/newnote/:id", catchAsync(boardController.createNote));

app.post("/board/deletenote/:id", catchAsync(boardController.deleteNote));

// Catch route errors
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message)
        err.message = "Uh oh, something went wrong!";
    //res.status(statusCode).render("Error", { err });
    res.send(err.message);
});

// Start listener
app.listen(port, () => {
    console.log(`Serving on port: ${port}`);
});