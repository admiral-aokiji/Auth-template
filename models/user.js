const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: Date,
        default: Date.now
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type:  String,
        required: true
    },
    isMaster: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("User", userSchema);