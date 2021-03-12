const express = require('express');
const router = express.Router();
const { findFavouritesHandler, addFavouriteHandler, deleteFavouriteHandler } = require('../controllers/favourites.js')
const auth = require("../middleware/auth.js")

router.get('/find', auth, findFavouritesHandler)
router.patch('/add', auth, addFavouriteHandler)
router.patch('/delete', auth, deleteFavouriteHandler)


module.exports = router; 