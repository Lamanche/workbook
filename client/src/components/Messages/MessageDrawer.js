import React, { useState } from 'react';
import styles from './Messages.module.css';
import { deleteMessage, postMessage } from '../../api/index';
import { tokenExpired } from '../../actions/auth.js';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../actions/update.js';
import { useHistory } from 'react-router-dom';

import { Drawer, Button, Paper, TextField, Typography, CircularProgress } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: '100%',
      
      /*PaperProps: {
          width: '100%'
      }*/
    },
  });


const MessageDrawer = ({ open, reply, setReply, currentMessage, setMessageOpen }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(state => state.auth.authData?.result.name);
    const userId = useSelector(state => state.auth.authData?.result._id);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({ type: 'message', title: `RE: ${currentMessage.title}`, author: userId, authorName: userName, forUser: currentMessage.author, forUserPost: currentMessage.forUserPost, message: '', seen: false });
    const [state, setState] = useState(open); 

    const userProfile = () => {
        history.push(`/userprofile/${currentMessage.author}`);
      };
    
    const deleteM = () => {
        setLoading(true)
        deleteMessage({ params: { id: currentMessage._id } })
            .then(res => {
                if (res.status === 200) {
                    setMessageOpen(false)
                    setLoading(false)
                    dispatch(update(1))
                };
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setLoading(false)
                    dispatch(tokenExpired());
                };
            });
    };

    const replyM = () => {
        setReply(true)
    };

    const cancelReply = () => {
        setReply(false)
    }

    const closeMessage = () => {
        setMessageOpen(false)
    }

    const setNewMessage = (e) => {
        setMessage({ ...message, message: e.target.value })
    };

    const sendReply = () => {
        setLoading(true);
        postMessage(message)
            .then(res => {
                if (res.status === 201) {
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                        setMessageOpen(false)
                    }, 1000);                    
                };
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                    setLoading(false);
                };
            });
    };
    
    return (
        <div className={styles.drawer}>
            <Drawer anchor='right' open={state} /*onClose={toggleDrawer(false)}*/>
                <div variant='persistent' role="presentation" >
                    <div className={styles.messageContainer}>
                        <Paper className={styles.messagePaper} variant='outlined'>
                            <div className={styles.messageHeader}>
                                <div className={styles.messageHeaderInfo}>                        
                                    <TextField  onClick={userProfile} label='Kasutajalt' InputLabelProps={{ shrink: true }} InputProps={{readOnly: true, classes: {root: styles.textField}}} value={currentMessage.authorName}/>                                               
                                    <TextField label='Teema' InputLabelProps={{ shrink: true }} InputProps={{readOnly: true}} value={currentMessage.title}/>
                                </div>
                                {reply === false ? 
                                    <div className={styles.messageHeaderButtons}>                            
                                        <div onClick={deleteM} className={styles.messageHeaderDelete}>
                                            {loading === false ? 
                                                <DeleteForeverIcon />
                                                :
                                                <CircularProgress size={24} />
                                            }                                
                                        </div>                        
                                        <div onClick={replyM} className={styles.messageHeaderReply}>
                                            <ReplyIcon fontSize='large'/>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                            </div>                
                            <div className={reply === false ? styles.messageBody : styles.messageBodyReply}>
                                {reply === false ? 
                                    <Typography style={{ whiteSpace: 'pre-wrap'}}>{currentMessage.message}</Typography>
                                    :
                                    <TextField className={styles.replyText} defaultValue={`\n ---------------------------- \n ${currentMessage.authorName} wrote: \n      ${currentMessage.message}`} onChange={setNewMessage} variant="outlined" multiline rows={10} InputProps={{ classes: { root: styles.replyText }}} />
                                }                    
                            </div>                
                            {reply === true ? 
                                <div className={styles.messageFooter}>
                                    <Button onClick={cancelReply} variant='contained' color='secondary'>Tühista</Button>
                                    <Button disabled={loading || success} onClick={sendReply} variant='contained' color='primary'>{loading && <CircularProgress size={24} className={styles.buttonProgress}/>}{success && <DoneIcon color="primary" className={styles.success}/>}Saada</Button>
                                </div>
                                :
                                <div className={styles.messageFooter}>
                                    <Button onClick={closeMessage} variant='contained' color='primary'>Sulge</Button>
                                </div>                                
                            }
                        </Paper>           
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default MessageDrawer
