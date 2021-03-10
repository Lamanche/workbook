const mongoose = require('mongoose')

const favouriteSchema = new mongoose.Schema({
    user: String,
    favourites: Array,
    createdAt: {
        type: Date,
        default: new Date(),
    },
}) 

module.exports = mongoose.model("Favourite", favouriteSchema);