const CommentModal = require('../models/comment.js')


const postComment = async (req, res) => {
    const comment = req.body
    const newComment = new CommentModal({...comment, createdAt: new Date().toISOString()})
    try {        
        await newComment.save();
        res.status(201).json({ newComment });
    } catch (error) {
        console.log(error)
    }
}

const findComments = async (req, res) => {
    const userId = req.query.userId
    try {
        const userComments = await CommentModal.find({ forUserId: userId });
        res.status(200).json({ userComments });
    } catch (error) {
        console.log(error)
    }
}

const deleteComment = async (req, res) => {
    const {id} = req.params;
    try {        
        await CommentModal.findByIdAndDelete({_id: id});
        res.status(204);
    } catch (error) {
        console.log(error)
    }    
}



module.exports = { postComment, findComments, deleteComment }