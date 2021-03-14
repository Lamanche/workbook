import React from 'react'
import styles from './Messages.module.css';
import MessageListItem from './MessageListItem';

const MessageList = ({ loading, messages, setCurrentMessage, setMessageOpen, setReply }) => {    
    
    return (
        <div className={styles.messageListContainer}>
            {loading === true ? 
                <p>Loading...</p> 
                :
                (messages.length > 0 ? 
                    messages.map(message => <MessageListItem key={message._id} setMessageOpen={setMessageOpen} setCurrentMessage={setCurrentMessage} message={message} setReply={setReply} />)
                    :
                    <h3>No messages</h3>
                )   
            }  
        </div>        
    )
}

export default MessageList
