const favouriteModal = require('../models/favourite.js');
const postModal = require('../models/post.js');


const findFavouritesHandler = async (req, res) => {
    const user = req.query.id;
    try {
        const result = await favouriteModal.findOne({ user: user });
        const favs = result.favourites
        const posts = await postModal.find({ '_id': { $in: favs }})
        res.status(200).json({ posts });
    } catch (error) {
        
    }
};

const addFavouriteHandler = async (req, res) => {
    const { userId, currentPostId } = req.body;
    try {
        const user = await favouriteModal.findOne({ user: userId });
        if (user === null) {
            const result = await favouriteModal.create({ user: userId, favourites: currentPostId });
            res.status(201).json({result});
        }
        else {
            const result = await favouriteModal.findOneAndUpdate({ user: userId }, { $push: { favourites: currentPostId }});
            console.log(result)
            res.status(200).json({result});
        };
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
};

const deleteFavouriteHandler = async (req, res) => {

};

module.exports = { addFavouriteHandler, deleteFavouriteHandler, findFavouritesHandler }