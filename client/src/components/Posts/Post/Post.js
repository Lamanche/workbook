import React from 'react'
import styles from './Post.module.css'
import { deletePosts } from '../../../api/index';

import { TextField, Paper, Button, Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import QueueIcon from '@material-ui/icons/Queue';

const Post = ({data}) => {
    const userId = JSON.parse(localStorage.getItem('profile'))?.result._id;
    const creatorId = data.creatorId;
    
    const makeOffer = () => {

    }
    
    const updatePost = () => {

    }
    
    const deletePost = () => {
        deletePosts(data._id)
        //window.location.reload()
    }

    const close = () => {

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
                            readOnly: true,
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
                            <Button onClick ={updatePost} className={styles.button} variant='contained' color='primary'>Update</Button>
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
