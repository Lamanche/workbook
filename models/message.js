const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({    
    type: String,
    author: String,
    authorName: String,
    title: String,
    forUser: String,
    forUserPost: String,
    message: String,
    seen: Boolean,
    createdAt: {
        type: Date,
        default: new Date(),
    },
}) 

module.exports = mongoose.model("Message", messageSchema);