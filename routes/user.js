const express = require('express');
const router = express.Router();
const { registerHandler, signInHandler, findProfileHandler, updateUserProfileHandler, logOutHandler } = require('../controllers/user.js')
const auth = require("../middleware/auth.js")


// User
router.post('/loggedin', auth)
router.post('/register', registerHandler);
router.post('/signin', signInHandler);
router.get('/logout', logOutHandler);


// User profiles
router.patch('/update/:id', auth, updateUserProfileHandler);
router.post('/find', findProfileHandler);


module.exports = router; 