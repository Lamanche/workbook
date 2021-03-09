import React, { useState, useEffect } from 'react';
import styles from './Messages.module.css';
import MessageList from './MessageList';
import Message from './Message';

const MyMessages = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setLoading(true)
        //Get all messages for user
        setMessages();
        setLoading(false);
    },[])

    return (
        <div className={styles.myMessagesContainer}>
            <div className={styles.messagesContainer}>
                <MessageList messages={messages}/>
                <Message />
            </div>            
        </div>
    )
}

export default MyMessages;
