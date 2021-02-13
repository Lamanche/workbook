const express = require('express');
const router = express.Router();
const {fetchAllPosts, createPost, deletePost, findUserPosts, findAllPostsByWord } = require('../controllers/post.js')
const auth = require("../middleware/auth.js")

router.get('/all', auth, fetchAllPosts);
router.post('/create', auth, createPost);
router.delete('/delete/:id', auth, deletePost)
router.get('/userposts', auth, findUserPosts)
router.get('/find', auth, findAllPostsByWord);

module.exports = router;