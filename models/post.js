const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    id: String,
    name: String,        
    email: String,
    company: String,
    type: String,
    category: String,
    userType: String,
    categoryType: String,
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