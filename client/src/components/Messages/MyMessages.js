import React, { useState, useEffect } from 'react';
import styles from './Messages.module.css';
import { useSelector, useDispatch } from 'react-redux';
import MessageList from './MessageList';
import Message from './Message';
import { fetchMessages } from '../../api';
import { tokenExpired } from '../../actions/auth.js';

const MyMessages = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.authData.result._id);
    const update = useSelector(state => state.update);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState({})
    const [messageOpen, setMessageOpen] =useState(false)
    const [reply, setReply] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetchMessages({ params: { userId }})
            .then(res => {
                const sortedData = res.data.messages.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                setMessages(sortedData);
                setLoading(false);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                    setLoading(false);
                }
            });        
    },[userId, dispatch, update])

    return (
        <div className={styles.myMessagesContainer}>
            <div className={styles.messagesContainer}>
                <MessageList setMessageOpen={setMessageOpen} setCurrentMessage={setCurrentMessage} loading={loading} messages={messages} setReply={setReply} />
                {messageOpen === true ?
                    <Message currentMessage={currentMessage} reply={reply} setReply={setReply} setMessageOpen={setMessageOpen} />
                    :
                    null
                }                
            </div>            
        </div>
    )
}

export default MyMessages;
