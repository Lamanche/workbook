import React, { useState } from 'react'
import styles from './Post.module.css'
import { update } from '../../../actions/update.js'
import { deletePosts } from '../../../api/index';
import { useSelector, useDispatch } from 'react-redux';
import { clearPostData } from '../../../actions/postData.js';

import { TextField, Paper, Button, Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import QueueIcon from '@material-ui/icons/Queue';

const Post = ({data}) => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.authData?.result._id);
    const creatorId = data.creatorId;    
    const [modify, setModify] = useState(false)
    
    const makeOffer = () => {

    }
    
    const modifyPost = () => {
        setModify(true)
    }

    const updatePost = () => {
        setModify(false)
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
                        label="Description"
                        defaultValue={data?.description}
                        fullWidth
                        InputProps={{
                            readOnly: modify === true ? false : true,
                            classes: {
                                input: styles.description
                            }
                        }}
                        multiline
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        className={styles.text}
                        label="Details"
                        defaultValue={data?.about}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        className={styles.text}
                        label="Price"
                        defaultValue={`${data?.price}€`}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        InputLabelProps={{ shrink: true }}
                    />                    
                </div>
                <div className={styles.buttonContainer}>
                    {userId === creatorId ?
                        <div className={styles.buttons}>                 
                            {modify === true ? 
                                <Button onClick ={updatePost} className={styles.button} variant='contained' color='primary'>Update</Button>
                                :
                                <Button onClick ={modifyPost} className={styles.button} variant='contained' color='primary'>Modify</Button>
                            }
                            <Button onClick={deletePost} className={styles.button} variant='contained' color='secondary'>Delete</Button>
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
