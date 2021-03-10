import React, { useState } from 'react';
import styles from './Offer.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { postOffer } from '../../api/index';
import { tokenExpired } from '../../actions/auth';

import { Paper, TextField, Button, Select, MenuItem, Typography, CircularProgress } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';


const MakeOffer = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector(state => state.auth.authData?.result.name);
    const userId = useSelector(state => state.auth.authData?.result._id);
    const [offerType, setOfferType] = useState('avalik');
    const [open, setOpen] = useState(false);
    const [offer, setOffer] = useState({ type: 'offer', author: userId, authorName: userName, forUser: props.postAuthor, forUserPost: props.postId, offerType: offerType, information: '', price: '', seen: false });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSelectChange = (event) => {
        setOfferType(event.target.value);
        setOffer({...offer, offerType: event.target.value});
    };
    
    const handleChange = (event) => {        
        setOffer({...offer, [event.target.name]: event.target.value});
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const submitOffer = (e) => {
        e.preventDefault();
        setLoading(true);
        postOffer(offer)
            .then(res => {
                if (res.status === 201) {
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                        props.setOffer(false);
                    }, 1500);                    
                };
            })
            .catch(error => {                
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                    setLoading(false);
                    props.setOffer(false);
                };
            });
    };

    const cancel = () => {
        props.setOffer(false)
    };
    
    return (
        <div className={styles.makeOfferContainer}>
            <Paper className={styles.makeOfferPaper} elevation={3}>
                <div className={styles.makeOfferHeader}>
                    <Typography className={styles.userName}>{userName}</Typography>
                    <Select value={offerType} open={open} onChange={handleSelectChange} onClose={handleClose} onOpen={handleOpen}>
                        <MenuItem value='avalik'>Avalik</MenuItem>
                        <MenuItem value='privaatne'>Privaatne</MenuItem>
                    </Select>
                </div>
                <form className={styles.makeOfferForm} onSubmit={submitOffer}>
                    <div className={styles.makeOfferText}>
                        <TextField onChange={handleChange} className={styles.makeOfferText} name='information' label='Lisainfo' variant="outlined" multiline/>
                        <TextField onChange={handleChange} className={styles.makeOfferText} name='price' label='Hind' required />                
                    </div>
                    <div className={styles.makeOfferFooter}>
                        <Button disabled={loading || success} className={styles.button} type='submit' variant='contained' color='primary'>{loading && <CircularProgress size={24} className={styles.buttonProgress} />}{success && <DoneIcon color="primary" className={styles.success}/>}Submit</Button>
                        <Button className={styles.button} onClick={cancel} variant='contained' color='secondary'>Cancel</Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default MakeOffer
