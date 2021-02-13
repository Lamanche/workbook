const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    author: String,
    authorEmail: String,        
    picture: String,
    comment: String,
    forUser: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
}) 

module.exports = mongoose.model("Comment", commentSchema);