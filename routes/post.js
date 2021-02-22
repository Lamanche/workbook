const express = require('express');
const router = express.Router();
const {fetchAllPosts, createPost, deletePost, findUserPosts, findAllPostsByWord, findPostsByKey } = require('../controllers/post.js')
const auth = require("../middleware/auth.js")

router.get('/all', fetchAllPosts);
router.post('/create', auth, createPost);
router.delete('/delete/:id', auth, deletePost)
router.get('/userposts', findUserPosts)
router.get('/find', findAllPostsByWord);
router.get('/findposts', findPostsByKey);

module.exports = router;