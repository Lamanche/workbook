import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import styles from './Header.module.css';

import { Button, Typography, AppBar } from '@material-ui/core';

  
const Header = () => { 
  const history = useHistory();
  const location = useSelector(state => state.location.location);
  const loggedIn = useSelector(state => state.auth.isLoggedIn)
  const user = useSelector(state => state.auth.authData)  

  const login = () => {
    history.push('/login');
  }  

  return (    
        <div className={styles.container}>
          <AppBar className={styles.appBar} position="static">
            <div className={styles.titleContainer}>              
                <Typography className={styles.title} variant='h2'><Link className={styles.link} to="/main">Wörkbook</Link></Typography>              
            </div>            
            {loggedIn === true ? (
                <div className={styles.profile}>
                  <Profile key={user} user={user} />    
                </div>
              ) 
              : 
              ((location ===  "/" || location === "/login" || location === "/register") ?                
                null
                :
                <div className={styles.loginBtnContainer}>
                  <Button variant='contained' color='secondary' onClick={login}>Log in</Button>
                </div>
              )                            
            }
          </AppBar>
        </div>
  );
}

export default Header
