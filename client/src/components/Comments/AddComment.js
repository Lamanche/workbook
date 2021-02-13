import React, { useState } from 'react'

// Styles
import { TextField, Button, makeStyles, Divider } from '@material-ui/core'

// API
import { postComment } from '../../api/index.js'



const AddComment = (props) => {
    const useStyles = makeStyles(() => ({
        container: {
            marginTop: 30,
            marginBottom: 30
        },
        form: {
            //width: '100%',
            //display: 'flex',
            //flexDirection: 'column',
            marginTop: 30,
            marginBottom: 20
        }
    }));
    const classes = useStyles();

    const author = JSON.parse(localStorage.getItem('profile')).result
    const email = props.email
    const initialState = { author: author.name, authorEmail: author.email, picture: author.picture, forUser: email, comment: '' }
    const [comment, setComment] = useState(initialState)
    
    const handleChange = (e) => {
        setComment({...comment, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        postComment(comment).then(window.location.reload())
    }
    
    return (
        <div className={classes.container}>
            <Divider />
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField onChange={handleChange} name='comment' label='Add comment...' variant="outlined" fullWidth multiline rows={4} required/>
                <Button style={{marginTop: 10}} variant="contained" type='submit' color="primary">Add comment</Button>
            </form>
            <Divider />
        </div>
    )
}

export default AddComment
