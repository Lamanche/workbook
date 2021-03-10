const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    type: String,
    author: String,
    authorName: String,
    forUser: String,
    forUserPost: String,        
    offerType: String,
    information: String,
    price: String,
    seen: Boolean,
    createdAt: {
        type: Date,
        default: new Date(),
    },
}) 

module.exports = mongoose.model("Offer", offerSchema);