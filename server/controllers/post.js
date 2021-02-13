const postModal = require('../models/post.js')


const fetchAllPosts = async (req, res) => {
    try {
        const Posts = await postModal.find();
        res.status(200).json({ Posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }    
}

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postModal({...post, createdAt: new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json({ newPost });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }    
}

const deletePost = async (req, res) => {
    const {id} = req.params;
    try {        
        await postModal.findOneAndDelete({_id: id});
        res.status(204);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }    
}

const findUserPosts = async (req, res) => {
    const name = req.query.name
    try {
        const Posts = await postModal.find({name: name});
        res.status(200).json({ Posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }    
}

const findAllPostsByWord = async (req, res) => {
    const word = req.query.word
    try {
        const Posts = await postModal.find({$text: {$search: word}});
        res.status(200).json({ Posts });
    } catch (error) {
        console.log(error)
    }    
}


module.exports = { fetchAllPosts, createPost, deletePost, findUserPosts, findAllPostsByWord }