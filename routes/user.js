const express = require('express');
const router = express.Router();
const { registerHandler, signInHandler, googleSignInHandler, findProfileHandler, updateUserProfileHandler, logOutHandler, newMessageHandler } = require('../controllers/user.js')
const auth = require("../middleware/auth.js")


// User
router.post('/loggedin', auth)
router.post('/register', registerHandler);
router.post('/signin', signInHandler);
router.post('/googlesignin', googleSignInHandler);
router.get('/logout', logOutHandler);


// User profiles
router.patch('/update/:id', auth, updateUserProfileHandler);
router.post('/find', findProfileHandler);


module.exports = router; 