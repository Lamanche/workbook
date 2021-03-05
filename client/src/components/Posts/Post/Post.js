import React, { useState } from 'react'
import styles from './Post.module.css'
import { update } from '../../../actions/update.js'
import { deletePosts } from '../../../api/index';
import { useSelector, useDispatch } from 'react-redux';
import { clearPostData } from '../../../actions/postData.js';

import { TextField, Paper, Button, Tooltip, InputAdornment } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import QueueIcon from '@material-ui/icons/Queue';
import CreateIcon from '@material-ui/icons/Create';

const Post = ({data}) => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.authData?.result._id);
    const creatorId = data.creatorId;    
    
    const [modify, setModify] = useState(false)
    const [formData, setFormData] = useState({ description: data.description, about: data.about, price: data.about });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    const makeOffer = () => {

    }
    
    const modifyPost = () => {
        setModify(true)
    }

    const updatePost = () => {
        setModify(false)
        console.log(formData)
    }

    const cancelUpdate = () => {
        setModify(false)
        setFormData({ description: data.description, about: data.about, price: data.about })
        console.log(formData)
    }
    
    const deletePost = () => {
        deletePosts(data._id)
            .then(dispatch(update(1)))
            .then(dispatch(clearPostData()))        
    }

    const close = () => {
        dispatch(clearPostData())
    }  
    
    const addToFav = () => {

    }
    
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
                                <Button onClick ={updatePost} classes={{root: styles.updateBtn}} className={styles.updateBtn} variant='contained' color='primary'>Update</Button>
                                :
                                <Button onClick ={modifyPost} className={styles.button} variant='contained' color='primary'>Modify</Button>
                            }
                            {modify === false ? 
                                <Button onClick={deletePost} className={styles.button} variant='contained' color='secondary'>Delete</Button>
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
