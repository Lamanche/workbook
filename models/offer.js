const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    author: String,
    authorName: String,
    picture: String,
    forUser: String,
    forUserPost: String,
    information: String,
    price: String,
    seen: Boolean,
    createdAt: {
        type: Date,
        default: new Date(),
    },
}) 

module.exports = mongoose.model("Offer", offerSchema);