const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    boardName: String,
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// Apply passport password functionality and security
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);