import React, { useState, useEffect } from 'react';
import styles from './Post.module.css';
import { update } from '../../../actions/update.js';
import { deletePosts, updatePost } from '../../../api/index';
import { useSelector, useDispatch } from 'react-redux';
import { clearPostData, setPostData } from '../../../actions/postData.js';
import MakeOffer from '../../Offers/MakeOffer';
import ContactMe from '../../Messages/ContactMe';
import Rent from './Rent';
import Fav from '../Fav';
import { tokenExpired } from '../../../actions/auth';
import moment from 'moment';
import 'moment/locale/et';

import { TextField, Paper, Button, InputAdornment, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SearchIcon from '@material-ui/icons/Search';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import DoneIcon from '@material-ui/icons/Done';


const Post = ({ data, setLoadingMain }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const userId = useSelector(state => state.auth.authData?.result._id);
    const creatorId = data.creatorId;
    const postId = data._id;
    const postTitle = data.description;    
    
    const [modify, setModify] = useState(false);
    const [formData, setFormData] = useState({ description: data.description, about: data.about, price: data.price, deadline: data.deadline, availableFrom: data.availableFrom, available: data.available });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [offer, setOffer] = useState(false);
    const [message, setMessage] = useState(false);
    const [selectedDate, setSelectedDate] = useState(data.availableFrom);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };    

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormData({ ...formData, deadline: date });
    };

    const makeOffer = () => {
        setMessage(false)
        setOffer(true);
    };

    const contactMe = () => {
        setOffer(false)
        setMessage(true)
    };
    
    const modifyPost = () => {
        setModify(true);
    };

    const updateP = () => {
        setLoading(true);
        updatePost(postId, formData)            
            .then(res => {
                if (res.status === 200) {
                    setModify(false);
                    dispatch(update(1));                   
                    dispatch(setPostData(res.data.updatedPost));
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 1000);                
                };
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                    setLoading(false);
                    setModify(false);
                };
            });
    };

    const cancelUpdate = () => {
        setModify(false);
        setFormData({ description: data.description, about: data.about, price: data.price, deadline: data.deadline, availableFrom: data.AvailableFrom, available: data.available });
    };
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const deletePost = () => {
        setOpen(false);
        setLoading(true);
        deletePosts(data._id)
            .then(res => {
                if (res.status === 200) {
                    setLoadingMain(true);
                    dispatch(update(1));
                    dispatch(clearPostData());                    
                    setLoading(false);
                };
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                    setLoading(false);
                    setModify(false);
                };
            });             
    };

    const close = () => {
        dispatch(clearPostData());
    }; 

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    
    return (
        <div className={styles.container}>
            <Paper className={styles.paper} elevation={3}>
                <div>
                    <div className={styles.postType}>
                        {data.type === 'Otsin' ? 
                            <SearchIcon />
                            :
                            <LocalOfferIcon />
                        }                        
                        <h2 className={styles.postTypeText}>{data.categoryType}</h2>
                    </div>                    
                    <div onClick={close} className={styles.close}>
                        <CloseIcon />
                    </div>
                </div>                
                <div>
                    <TextField
                        className={styles.text}
                        onChange={handleChange}
                        label="Pealkiri"
                        name= 'description'
                        defaultValue={data?.description}
                        value={modify === false ? data.description : undefined}
                        fullWidth                        
                        InputProps={{
                            readOnly: modify === true ? false : true,
                            classes: {
                                root: modify === true ? styles.textModify : styles.description,
                                input: styles.textField,
                            },
                            endAdornment: (
                                modify === true ? <CreateIcon/> : null
                               ),
                        }}
                        multiline
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        className={styles.text}
                        onChange={handleChange}
                        label="Üksikasjad"
                        name= 'about'
                        defaultValue={data?.about}
                        value={modify === false ? data.about : undefined}
                        fullWidth                        
                        InputProps={{
                            readOnly: modify === true ? false : true,
                            classes: {
                                root: modify === true ? styles.textModify : styles.description,
                                input: styles.textField,
                            },
                            endAdornment: (
                                modify === true ? <CreateIcon/> : null
                               ),
                        }}
                        multiline
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        className={styles.text}
                        onChange={handleChange}
                        label="Hind"
                        name= 'price'
                        defaultValue={data?.price}
                        value={modify === false ? data.price : undefined}                        
                        fullWidth                        
                        InputProps={{
                            readOnly: modify === true ? false : true,
                            classes: {
                                root: modify === true ? styles.textModify : styles.description,
                                input: styles.textField,                                
                            },
                            endAdornment: (
                                modify === true ? <CreateIcon/> : null
                               ),
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}
                        multiline
                        InputLabelProps={{ shrink: true }}
                    />
                    {data.categoryType === 'Hange' ? 
                        (modify === true ? 
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    disablePast
                                    variant="dialog"
                                    format="dd.MM.yyyy"
                                    margin="normal"
                                    label="Saadaval alates"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    classes={{ 
                                        root: styles.datePicker,                        
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            :
                            <TextField
                                className={styles.text}
                                //onChange={handleChange}
                                label="Hanke tähtaeg"
                                name= 'deadline'
                                defaultValue={moment(selectedDate).format('LL')}                                                        
                                fullWidth                        
                                InputProps={{
                                    readOnly: true,
                                    classes: {
                                        root: styles.description,
                                        input: styles.textField,                                
                                    },
                                    endAdornment: (
                                        modify === true ? <CreateIcon/> : null
                                    ),
                                    startAdornment: <InputAdornment position="start"><EventBusyIcon /></InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                            />)
                        :
                        null                    
                    }
                    {data.categoryType === 'Rent' ? 
                        <Rent setFormData={setFormData} formData={formData} data={data} modify={modify} />
                        :
                        null                    
                    }                              
                </div>
                <div className={styles.buttonContainer}>
                    {userId === creatorId ?
                        <div className={styles.buttons}>                 
                            {modify === true ?                                 
                                <Button onClick ={updateP} classes={{root: styles.updateBtn}} className={styles.updateBtn} disabled={loading} variant='contained' color='primary'>{loading && <CircularProgress size={24} className={styles.buttonProgress}/>}Kinnita</Button>                                    
                                :
                                <Button onClick ={modifyPost} className={styles.button} variant='contained' color='primary' disabled={loading || success}>{success && <DoneIcon color="primary" className={styles.success}/>}Muuda</Button>
                            }
                            {modify === false ? 
                                <>    
                                    <Button onClick={handleClickOpen} className={styles.button} disabled={loading} variant='contained' color='secondary'>{loading && <CircularProgress size={24} className={styles.buttonProgress}/>}Kustuta</Button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}                                        
                                    >
                                        <DialogTitle>{"Oled kindel, et soovid postituse kustutada?"}</DialogTitle>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary" autoFocus>Tühista</Button>
                                            <Button onClick={deletePost} color="secondary">Kinnita</Button>
                                        </DialogActions>
                                    </Dialog>
                                </>
                                :
                                <Button onClick={cancelUpdate} className={styles.button} variant='contained' color='secondary'>Tühista</Button>
                            }
                        </div>
                        : 
                        (isLoggedIn === true ?
                            (data.categoryType === 'Hange' ? 
                                <div className={styles.buttons}>
                                    <Button disabled={offer} onClick ={makeOffer} className={styles.button} variant='contained' color='primary'>Tee pakkumine</Button>
                                    <Button disabled={message} onClick ={contactMe} className={styles.contactBtn} variant='contained' color='primary'>Võta ühendust</Button>
                                </div>
                                :
                                <div className={styles.buttons}>
                                    <Button disabled={message} onClick ={contactMe} className={styles.contactBtn} variant='contained' color='primary'>Võta ühendust</Button>
                                </div>
                            )
                            :
                            null
                        )
                    }
                    {isLoggedIn ? 
                        (creatorId === userId ?
                            null
                            :
                            <Fav userId={userId} currentPostId={postId} style={styles.addToFav}/>
                        )
                        :
                        null
                    }              
                </div>             
            </Paper>
            {offer ? 
                <MakeOffer setOffer={setOffer} setMessage={setMessage} postId={postId} postAuthor={creatorId} />
                :
                null
            }
            {message ? 
                <ContactMe setMessage={setMessage} setOffer={setOffer} postId={postId} postAuthor={creatorId} title={postTitle}/>
                :
                null
            }
            
            
        </div>
    )
}

export default Post
