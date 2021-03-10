import React from 'react';
import styles from './Messages.module.css';

import { Paper, Typography } from '@material-ui/core'

const messageListItem = ({message}) => {
    
    const openMessage = () => {
        
    }
    
    return (
        <div onClick={openMessage} className={styles.messageListItemContainer}>
            <Paper className={styles.messageListItemPaper} square variant='outlined'>
                <Typography className={styles.senderName}>{message.author}</Typography>
                <Typography className={styles.messagePreview} >{message.message.slice(0, 35)}{message.message.length > 35 ? '...' : null}</Typography>
            </Paper>
            
        </div>
    )
}

export default messageListItem
