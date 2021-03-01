import React, { useState } from 'react'
import styles from './Comments.module.css'
import { useDispatch } from 'react-redux';
import { update } from '../../actions/update.js'
import { postComment } from '../../api/index.js'

import { TextField, Button, Paper } from '@material-ui/core'


const AddComment = (props) => {
    const dispatch = useDispatch();
    const author = JSON.parse(localStorage.getItem('profile'))?.result
    const email = props.email
    const initialState = { author: author?.name, authorEmail: author?.email, picture: author?.picture, forUser: email, comment: '' }
    const [comment, setComment] = useState(initialState)
    
    const handleChange = (e) => {
        setComment({...comment, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        //e.target.value = ''
        postComment(comment)
            .then(res => {
                if (res.status === 201) {
                    dispatch(update(1))
                }                
            })
    }
    
    return (
        <div className={styles.addCommentContainer}>
            <Paper className={styles.paper} elevation={3}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <TextField onChange={handleChange} name='comment' label='Add comment...' variant="outlined" fullWidth multiline rows={4} required/>
                    <Button style={{marginTop: 10}} variant="contained" type='submit' color="primary">Add comment</Button>
                </form>
            </Paper>
        </div>
    )
}

export default AddComment
