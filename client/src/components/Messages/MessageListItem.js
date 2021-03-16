import React from 'react';
import styles from './Messages.module.css';
import { patchMessage } from '../../api';

import { Paper, Typography } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import DraftsIcon from '@material-ui/icons/Drafts';

const MessageListItem = ({ setChosen, active, setMessageOpen, setCurrentMessage, message, setReply }) => {    
    
    const openMessage = () => {
        setReply(false);
        setChosen(message)
        if (message.seen === false) {
            setCurrentMessage(message, message.seen = true);
            patchMessage({ id: message._id });
        };
        setCurrentMessage(message)    
        setMessageOpen(true); 
    };
    
    return (
        <div onClick={openMessage} className={styles.messageListItemContainer}>
            <Paper className={active ? styles.messageListItemPaperActive : styles.messageListItemPaper} square variant='outlined'>
                <div className={styles.listItemHeader}>
                    <div>
                    <Typography className={styles.senderName}>{message.authorName}</Typography>
                    </div>
                    <div>
                        {message.seen === false ? 
                            <EmailIcon />
                            :
                            <DraftsIcon />
                        }
                    </div>
                </div>
                <div>
                    <Typography className={styles.messagePreview} >{message.title?.slice(0, 25)}{message.title?.length > 25 ? '...' : null}</Typography>
                </div>
                
            </Paper>
            
        </div>
    )
}

export default MessageListItem
