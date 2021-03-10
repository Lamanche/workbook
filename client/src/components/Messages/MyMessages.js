import React, { useState, useEffect } from 'react';
import styles from './Messages.module.css';
import { useSelector } from 'react-redux';
import MessageList from './MessageList';
import Message from './Message';
import { fetchMessages } from '../../api';

const MyMessages = () => {
    const userId = useSelector(state => state.auth.authData.result._id);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setLoading(true)
        fetchMessages({ params: { userId }})
            .then(res => {
                const sortedData = res.data.messages.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                setMessages(sortedData);
                setLoading(false);
            });
        
    },[userId])

    return (
        <div className={styles.myMessagesContainer}>
            <div className={styles.messagesContainer}>
                <MessageList loading={loading} messages={messages}/>
                <Message />
            </div>            
        </div>
    )
}

export default MyMessages;
