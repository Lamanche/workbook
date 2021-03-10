const express = require('express');
const router = express.Router();
const { findMessagesHandler, newMessageHandler, deleteMessageHandler, findOffersHandler, newOfferHandler, deleteOfferHandler } = require('../controllers/messages.js')
const auth = require("../middleware/auth.js")

/* Messages */
router.get('/findmessages', auth, findMessagesHandler)
router.post('/newmessage', auth, newMessageHandler)
router.delete('/deletemessage', auth, deleteMessageHandler)

/* Offers */
router.get('/findoffers', auth, findOffersHandler)
router.post('/newoffer', auth, newOfferHandler)
router.delete('/deleteoffer', auth, deleteOfferHandler)


module.exports = router; 