const messageModal = require('../models/message.js');
const offerModal = require('../models/offer.js');


/* Messages */
const findMessagesHandler = async (req, res) => {
    const id = req.query.userId;
    try {
        const messages = await messageModal.find({ forUser: id});
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    };
    
};

const newMessageHandler = async (req, res) => {
    const message = req.body;
    const newMessage = new messageModal({...message, createdAt: new Date().toISOString()});
    try {
        await newMessage.save();
        res.status(201).json({ message: "Message sent" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    };

};

const deleteMessageHandler = async (req, res) => {
    
};

/* Offers */
const findOffersHandler = async (req, res) => {
    const id = req.query.userId;
    try {
        const offers = await offerModal.find({ forUser: id});
        res.status(200).json({ offers });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    };
};

const newOfferHandler = async (req, res) => {
    const offer = req.body;
    const newOffer = new offerModal({...offer, createdAt: new Date().toISOString()});
    try {
        await newOffer.save();
        res.status(201).json({ message: "Offer made" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    };
};

const deleteOfferHandler = async (req, res) => {

};


module.exports = { findMessagesHandler, newMessageHandler, deleteMessageHandler, findOffersHandler, newOfferHandler, deleteOfferHandler };