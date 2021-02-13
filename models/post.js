const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    name: String,        
    email: String,
    category: String,
    description: String,
    about: String,
    picture: String,
    creatorId: String,
    price: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

postSchema.index({'$**': 'text'})

module.exports = mongoose.model("Post", postSchema);