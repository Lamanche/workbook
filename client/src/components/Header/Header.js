import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './Profile';
import styles from './Header.module.css';
import { fetchUnreadMessages } from '../../api';
import { tokenExpired } from '../../actions/auth.js';

import { Button, Typography, AppBar } from '@material-ui/core';

  
const Header = () => { 
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useSelector(state => state.location.location);
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.authData);
  const userId = useSelector(state => state.auth.authData?.result._id);

  const [unreadMessages, setUnreadMessages] = useState(0)

  const login = () => {
    history.push('/login');
  }; 

  useEffect(() => {
    if (loggedIn === true) {
      fetchUnreadMessages({ params: { userId }})
            .then(res => {
              setUnreadMessages(res.data.messages.length)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                }
            });        
    }
  },[loggedIn, userId, dispatch])

  return (    
        <div className={styles.container}>
          <AppBar className={styles.appBar} position="static">
            <div className={styles.titleContainer}>              
                <Typography className={styles.title} variant='h2'><Link className={styles.link} to="/main">Wörkbook</Link></Typography>              
            </div>            
            {loggedIn === true ? (
                <div className={styles.profile}>
                  <Profile key={user} unread={unreadMessages} setUnread={setUnreadMessages} user={user} />    
                </div>
              ) 
              : 
              ((location ===  "/" || location === "/login" || location === "/register") ?                
                null
                :
                <div className={styles.loginBtnContainer}>
                  <Button className={styles.loginBtn} variant='contained' color='secondary' onClick={login}>Log in</Button>
                </div>
              )                            
            }
          </AppBar>
        </div>
  );
}

export default Header
