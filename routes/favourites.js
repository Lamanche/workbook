const express = require('express');
const router = express.Router();
const { findFavouritesHandler, addFavouriteHandler, deleteFavouriteHandler } = require('../controllers/favourites.js')
const auth = require("../middleware/auth.js")

router.get('/find', auth, findFavouritesHandler)
router.post('/add', auth, addFavouriteHandler)
router.delete('/delete', auth, deleteFavouriteHandler)


module.exports = router; 