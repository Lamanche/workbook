const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    author: String,
    authorId: String,
    authorEmail: String,        
    picture: String,
    comment: String,
    forUserId: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
}) 

module.exports = mongoose.model("Comment", commentSchema);