const express = require('express');
const router = express.Router();
const { postComment, findComments, deleteComment } = require('../controllers/comments.js')
const auth = require("../middleware/auth.js")


router.post('/post', auth, postComment);
router.get('/find', auth, findComments);
router.delete('/delete/:id', auth, deleteComment)


module.exports = router;