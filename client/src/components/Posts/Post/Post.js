import React, { useState } from 'react';
import styles from './Post.module.css';
import { update } from '../../../actions/update.js';
import { deletePosts, updatePost } from '../../../api/index';
import { useSelector, useDispatch } from 'react-redux';
import { clearPostData, setPostData } from '../../../actions/postData.js';

import { TextField, Paper, Button, Tooltip, InputAdornment, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import QueueIcon from '@material-ui/icons/Queue';
import CreateIcon from '@material-ui/icons/Create';

const Post = ({data}) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.authData?.result._id);
    const creatorId = data.creatorId;
    const postId = data._id    
    
    const [modify, setModify] = useState(false);
    const [formData, setFormData] = useState({ description: data.description, about: data.about, price: data.about });
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const makeOffer = () => {

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
                };
            });
    };

    const cancelUpdate = () => {
        setModify(false);
        setFormData({ description: data.description, about: data.about, price: data.about });
    };
    
    const deletePost = () => {
        setLoading(true);
        deletePosts(data._id)
            .then(res => {
                if (res.status === 200) {
                    dispatch(update(1));
                    dispatch(clearPostData());                    
                    setLoading(false);
                };
            });                   
    };

    const close = () => {
        dispatch(clearPostData());
    }; 
    
    const addToFav = () => {

    };
    
    return (
        <div className={styles.container}>
            <Paper className={styles.paper} elevation={3}>
                <div onClick={close} className={styles.close}>
                    <CloseIcon />
                </div>
                <div>
                    <TextField
                        className={styles.text}
                        onChange={handleChange}
                        label="Description"
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
                        label="Details"
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
                        label="Price"
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
                </div>
                <div className={styles.buttonContainer}>
                    {userId === creatorId ?
                        <div className={styles.buttons}>                 
                            {modify === true ? 
                                <Button onClick ={updateP} classes={{root: styles.updateBtn}} className={styles.updateBtn} disabled={loading} variant='contained' color='primary'>{loading && <CircularProgress size={24} className={styles.buttonProgress}/>}Update</Button>
                                :
                                <Button onClick ={modifyPost} className={styles.button} variant='contained' color='primary'>Modify</Button>
                            }
                            {modify === false ? 
                                <Button onClick={deletePost} className={styles.button} disabled={loading} variant='contained' color='secondary'>{loading && <CircularProgress size={24} className={styles.buttonProgress}/>}Delete</Button>
                                :
                                <Button onClick={cancelUpdate} className={styles.button} variant='contained' color='secondary'>cancel</Button>
                            }
                        </div>
                        : 
                        <div className={styles.buttons}>
                            <Button onClick ={makeOffer} className={styles.button} variant='contained' color='primary'>Make offer</Button>
                        </div>
                    }
                    <div className={styles.addToFav}>
                        <Tooltip title="Add to favorites">
                            <QueueIcon onClick={addToFav} />
                        </Tooltip>
                  </div>
                </div>             
            </Paper>
        </div>
    )
}

export default Post
