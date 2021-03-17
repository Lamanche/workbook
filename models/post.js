const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    id: String,
    name: String,        
    email: String,
    company: String,
    website: String,
    type: String,
    category: String,
    userType: String,
    categoryType: String,
    description: String,
    about: String,
    picture: String,
    creatorId: String,
    price: String,
    deadline: String,
    available: Boolean,
    availableFrom: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

postSchema.index({'$**': 'text'})

module.exports = mongoose.model("Post", postSchema);