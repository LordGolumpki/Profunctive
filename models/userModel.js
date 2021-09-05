// Import external modules
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Define user schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    boardName: String,
    notes: [[String]]
});

// Apply passport password functionality to the schema
UserSchema.plugin(passportLocalMongoose);

// Export schema
module.exports = mongoose.model("User", UserSchema);