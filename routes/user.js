const express = require('express');
const router = express.Router();
const { registerHandler, signInHandler, findProfileHandler, updateUserProfileHandler } = require('../controllers/user.js')
const auth = require("../middleware/auth.js")


// User
router.post('/register', registerHandler);
router.post('/signin', signInHandler);


// User profiles
router.patch('/update/:id', auth, updateUserProfileHandler);
router.post('/find', auth, findProfileHandler);


module.exports = router; 