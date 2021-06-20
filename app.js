/**
 * Author: Ivan Jones
 * Version: 6/19/21
 */

// Import external modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

// Import internal modules
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

// Define instance variables
const port = 8080;

// Establish connection to mongo database
mongoose.connect("mongodb://localhost:27017/profunctive", {
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
// Enable express to receive pseudo-requests
app.use(methodOverride("_method"));
// Enable ejs templates to be read
app.set("view engine", "ejs");
// Set the path for views directory
app.set("views", path.join(__dirname, "views"));
// Serve static assets
app.use(express.static(path.join(__dirname, "public")));

// Define routes
// Home route
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Sign in route
app.get("/signin", (req, res) => {
    res.render("signIn.ejs");
});

// Sign up route
app.get("/signup", (req, res) => {
    res.render("signUp.ejs");
});

// User board route
app.get("/board", (req, res) => {
    res.render("userPage.ejs");
});

// Start listener
app.listen(port, () => {
    console.log(`Serving on port: ${port}`);
});