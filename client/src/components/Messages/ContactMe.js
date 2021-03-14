import React, { useState } from 'react';
import styles from './Messages.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { postMessage } from '../../api/index'
import { tokenExpired } from '../../actions/auth';

import { Paper, TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const ContactMe = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector(state => state.auth.authData?.result.name);
    const userId = useSelector(state => state.auth.authData?.result._id);
    const [message, setMessage] = useState({ type: 'message', title: props.title, author: userId, authorName: userName, forUser: props.postAuthor, forUserPost: props.postId, message: '', seen: false });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (event) => {        
        setMessage({...message, [event.target.name]: event.target.value});
    };

    const submitMessage = (e) => {
        e.preventDefault();
        setLoading(true);
        postMessage(message)
            .then(res => {
                if (res.status === 201) {
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                        props.setMessage(false);
                    }, 1000);                    
                };
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                    setLoading(false);
                    props.setMessage(false);
                };
            });
    };

    const cancel = () => {
        props.setMessage(false);
    };
    
    return (
        <div className={styles.contactContainer}>
            <Paper className={styles.contactPaper} elevation={3}>
                <div className={styles.contactHeader}>
                    <Typography className={styles.userName}>{userName}</Typography>
                </div>
                <form className={styles.contactForm} onSubmit={submitMessage}>
                    <div className={styles.contactTextContainer}>
                        <TextField onChange={handleChange} className={styles.contactText} name='message' label='message' variant="outlined" multiline rows={4} required/>                
                    </div>
                    <div className={styles.contactFooter}>
                        <Button disabled={loading || success} className={styles.button} type='submit' variant='contained' color='primary'>{loading && <CircularProgress size={24} className={styles.buttonProgress}/>}{success && <DoneIcon color="primary" className={styles.success}/>}Send</Button>
                        <Button className={styles.button} onClick={cancel} variant='contained' color='secondary'>Cancel</Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default ContactMe
