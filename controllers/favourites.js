const favouriteModal = require('../models/favourite.js');
const postModal = require('../models/post.js');


const findFavouritesHandler = async (req, res) => {
    const user = req.query.id;
    try {
        const result = await favouriteModal.findOne({ user: user });
        const favs = result.favourites
        const posts = await postModal.find({ '_id': { $in: favs }})
        res.status(200).json({ favs, posts });
    } catch (error) {
        res.status(404).json({ message: 'Not found' })
    }
};

const addFavouriteHandler = async (req, res) => {
    const { userId, currentPostId } = req.body;
    try {
        const user = await favouriteModal.findOne({ user: userId });
        if (user === null) {
            const result = await favouriteModal.create({ user: userId, favourites: currentPostId });
            res.status(201).json({ result });
        }
        else {
            const favoriteExists = await favouriteModal.find({ user: userId, favourites: currentPostId});
                if (favoriteExists.length === 0) {
                    await favouriteModal.findOneAndUpdate({ user: userId }, { $push: { favourites: currentPostId }});
                    const result = await favouriteModal.findOne({ user: userId });
                    res.status(200).json({ result });
                } else {
                    res.status(304).json({ message: 'Already exists'})
                };            
        };
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
};

const deleteFavouriteHandler = async (req, res) => {
    const { userId, currentPostId } = req.body;
    try {
        await favouriteModal.findOneAndUpdate({ user: userId }, { $pull: { favourites: currentPostId }});
        const result = await favouriteModal.findOne({ user: userId });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
};

module.exports = { addFavouriteHandler, deleteFavouriteHandler, findFavouritesHandler }