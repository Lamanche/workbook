import React, { useState } from 'react'
import styles from './Comments.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../actions/update.js'
import { tokenExpired } from '../../actions/auth.js'
import { postComment } from '../../api/index.js'

import { TextField, Button, Paper, CircularProgress } from '@material-ui/core';


const AddComment = (props) => {
    const dispatch = useDispatch();
    const author = useSelector(state => state.auth.authData.result)
    const forUserId = props.userId
    
    const initialState = { author: author.name, authorId: author._id, authorEmail: author.email, picture: author.picture, forUserId: forUserId, comment: '' }
    const [comment, setComment] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    
    const handleChange = (e) => {
        setComment({...comment, [e.target.name]: e.target.value})
        setValue(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        postComment(comment)
            .then(res => {
                if (res.status === 201) {
                    dispatch(update(1))
                    setLoading(false)
                }                
            }).catch(error => {
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                    setLoading(false)
               }                           
            })
        setValue('')
    }
    
    return (
        <div className={styles.addCommentContainer}>
            <Paper className={styles.paper} elevation={3}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <TextField value={value} onChange={handleChange} name='comment' label='Add comment...' variant="outlined" fullWidth multiline rows={4} required/>
                    <div className={styles.addButton}>
                        <Button disabled={loading} variant="contained" type='submit' color="primary">{loading && <CircularProgress size={24} className={styles.buttonProgress} />}Add comment</Button>                        
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default AddComment
