import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../actions/types';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { clearProfile } from '../actions/profile.js'

// Styles
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';



export default function ProminentAppBar() {
  const dispatch = useDispatch();
  let history = useHistory();

  const signedIn = useSelector(state => state.auth.isLoggedIn);
  const user = JSON.parse(localStorage.getItem('profile'));  

  const [anchorEl, setAnchorEl] = useState(null);
  
  // Functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const profile = () => {
    dispatch(clearProfile())
    history.replace("/userprofile");
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.replace("/");
    setAnchorEl(null);    
  };

  const form = () => {
    history.replace("/form");
    setAnchorEl(null);   
  };  

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  },[user?.token])

// Styles  
// Container
const useStyles = makeStyles(() => ({
    appBar: {
      height: 158,
      position: 'relative',
      display: 'flex',
      paddingTop: 8, 
      "@media (max-width: 550px)": {
        flexDirection: 'column',
        height: 120,
      }  
    },
    
// Title
    title: {
      position: 'absolute',
      bottom: 10,
      left: 20,
      "@media (max-width: 550px)": {
        left: 10       
      },          
    },
    headline: {
      fontWeight: 'bold',
      fontSize: '4rem',
      "@media (max-width: 550px)": {
        fontSize: '2.8rem',       
      },       
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    },

// profile
    profile: {
      display: 'flex',
      position: 'absolute',
      right: 10, 
      top: 10, 
      "@media (max-width: 550px)": {
        top: 2,
      }
    },
    avatar: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 10,
      marginTop: 4,
      "@media (max-width: 550px)": {
        marginRight: 10,
        height: 25,
        width: 25,
        marginTop: 12,
      }
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
      "@media (max-width: 550px)": {
        fontSize: '0.9rem',
      }
    },    
  }));

  const classes = useStyles();

  return (    
      <AppBar className={classes.appBar}position="static">
            <div className={classes.title}>              
                <Typography className={classes.headline} variant='h2'><Link className={classes.link} to="/main">Wörkbook{/*<span style={{color: 'red'}}>(Alpha Testing)</span>*/}</Link></Typography>              
            </div>
            
            {user || signedIn ? (
                <div className={classes.profile}>
                  <Avatar className={classes.avatar} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>              
                  <IconButton aria-label="display more actions" edge="end" color="inherit">
                    <MoreIcon onClick={handleClick} />
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}                        
                        onClose={handleClose}
                        >
                        <MenuItem onClick={form}>New post</MenuItem>
                        <MenuItem onClick={profile}>My profile</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </Menu>                          
                  </IconButton>                
                </div>
              ) 
              : 
              null}
      </AppBar>
  );
}
