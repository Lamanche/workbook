import React, { useState } from 'react';
import styles from './Messages.module.css';
import { useSelector } from 'react-redux';
import { postMessage } from '../../api/index'

import { Paper, TextField, Button, Typography, CircularProgress } from '@material-ui/core';

const ContactMe = (props) => {
    const userName = useSelector(state => state.auth.authData?.result.name);
    const userId = useSelector(state => state.auth.authData?.result._id);
    const [message, setMessage] = useState({author: userId, forUser: props.postAuthor, forUserPost: props.postId, message: ''});
    const [loading, setLoading] = useState(false);

        const handleChange = (event) => {        
        setMessage({...message, [event.target.name]: event.target.value});
    };

    const submitMessage = (e) => {
        e.preventDefault();
        setLoading(true);
        postMessage(message)
            .then(res => {
                if (res.status === 200) {
                    setLoading(false);
                    /*Siia setTimeoutiga midagi mis näitab paar sekki, et sõnum saadetud*/                    
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
                        <TextField onChange={handleChange} className={styles.contactText} name='message' label='message' variant="outlined" multiline rows={4}/>                
                    </div>
                    <div className={styles.contactFooter}>
                        <Button disabled={loading} className={styles.button} type='submit' variant='contained' color='primary'>{loading && <CircularProgress size={24} className={styles.buttonProgress} />}Send</Button>
                        <Button className={styles.button} onClick={cancel} variant='contained' color='secondary'>Cancel</Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default ContactMe
