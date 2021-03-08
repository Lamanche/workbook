import React, { useState } from 'react';
import styles from './Offer.module.css';
import { useSelector } from 'react-redux'

import { Paper, TextField, Button, Select, MenuItem, Typography, InputAdornment } from '@material-ui/core';

const MakeOffer = (props) => {
    const userName = useSelector(state => state.auth.authData?.result.name);
    const userId = useSelector(state => state.auth.authData?.result._id);
    const [offerType, setOfferType] = useState('avalik');
    const [open, setOpen] = useState(false);
    const [offer, setOffer] = useState({author: userId, forUser: props.postAuthor, forUserPost: props.postId, offerType: offerType, information: '', price: ''});
    const [loading, setLoading] = useState(false)

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
        e.preventDefault()
        setLoading(true)
        console.log(offer)
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
                        <TextField onChange={handleChange} className={styles.makeOfferText} name='price' label='Hind' required inputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>}} />                
                    </div>
                    <div className={styles.makeOfferFooter}>
                        <Button className={styles.button} type='submit' variant='contained' color='primary'>Submit</Button>
                        <Button className={styles.button} onClick={cancel} variant='contained' color='secondary'>Cancel</Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default MakeOffer
