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
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      height: 158
    },
    toolbar: {
      height: '100%',
      alignItems: 'flex-start',
      paddingTop: 8, 
      paddingBottom: 10,
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-end',
      fontWeight: 'bold'
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    },
    profileRoot: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative'
    },
    profile: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    avatar: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 20,
      marginTop: 4
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 10,
    },    
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}position="static">
        <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h2" noWrap>
              <Link className={classes.link} to="/main">
                <Typography className={classes.title} variant='h2'>Wörkbook</Typography>
              </Link>
            </Typography>
            
            {user || signedIn ? (
              <div className={classes.profileRoot}>
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
              </div>
              ) 
              : 
              null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
