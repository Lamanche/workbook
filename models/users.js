const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userType: {
        type: String, 
        required: true
    },
    company: {
        type: String
    },
    googleId: {
        type: String
    },    
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    id: {
        type: String
    },
    about: {
        type: String, 
        //required: true
    },
    experience: {
        type: String, 
        //required: true
    },
    references: {
        type: String, 
        //required: true
    },
    profile: {
        type: Boolean, 
        //required: true
    },
    picture: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
}) 

module.exports = mongoose.model("User", userSchema);