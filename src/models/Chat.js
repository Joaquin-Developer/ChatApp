
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatSchema = new Schema({
    username: String,
    message: String,
    messageData: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Chat", ChatSchema);
