import React, { useState } from 'react';
import styles from './Messages.module.css';

import { Button, Paper, TextField, Typography } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const Message = ({ currentMessage }) => {
    const [reply, setReply] = useState(false)

    const deleteMessage = () => {

    };

    const replyToMessage = () => {
        setReply(true)
    };
    
    return (
        <div className={styles.messageContainer}>
            <Paper variant='outlined'>
                <div className={styles.messageHeader}>
                    <div className={styles.messageHeaderInfo}>
                        <TextField label='Kasutajalt' className={styles.textField} InputLabelProps={{ shrink: true }} inputProps={{readOnly: true, classes: {input: styles.textField}}} value={currentMessage.authorName}/>
                        <TextField label='Teema' InputLabelProps={{ shrink: true }} inputProps={{readOnly: true}} value={currentMessage}/>
                    </div>
                    {reply === false ? 
                        <div className={styles.messageHeaderButtons}>
                            <div onClick={deleteMessage} className={styles.messageHeaderDelete}>
                                <DeleteForeverIcon />
                            </div>                        
                            <div onClick={replyToMessage} className={styles.messageHeaderReply}>
                                <ReplyIcon fontSize='large'/>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                <div className={styles.messageBody}>
                    <Typography>{currentMessage.message}</Typography>
                </div>
                {reply === true ? 
                    <div className={styles.messageFooter}>
                        <Button variant='contained' color='primary'>Saada</Button>
                    </div>
                    :
                    null
                }
            </Paper>           
        </div>
    )
}

export default Message
