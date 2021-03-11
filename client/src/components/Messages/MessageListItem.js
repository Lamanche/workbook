import React from 'react';
import styles from './Messages.module.css';

import { Paper, Typography } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import DraftsIcon from '@material-ui/icons/Drafts';

const messageListItem = ({setMessageOpen, setCurrentMessage, message}) => {    
    const openMessage = () => {
        setCurrentMessage(message)
        setMessageOpen(true)
    }
    
    return (
        <div onClick={openMessage} className={styles.messageListItemContainer}>
            <Paper className={styles.messageListItemPaper} square variant='outlined'>
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
                    <Typography className={styles.messagePreview} >{message.message.slice(0, 35)}{message.message.length > 35 ? '...' : null}</Typography>
                </div>
                
            </Paper>
            
        </div>
    )
}

export default messageListItem
