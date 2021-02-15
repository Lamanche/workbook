import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../actions/types';
import { Link } from 'react-router-dom';
import { clearProfile } from '../../actions/profile.js'
import { useStyles } from './styles'

// Styles
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';


const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const signedIn = useSelector(state => state.auth.isLoggedIn);
  const user = JSON.parse(localStorage.getItem('profile'));  

  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const profile = () => {
    dispatch(clearProfile())
    history.push("/userprofile");
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.replace("/");
    setAnchorEl(null);    
  };

  const post = () => {
    history.push("/form");
    setAnchorEl(null);   
  }; 

  return (    
      <AppBar className={classes.appBar} position="static">
            <div className={classes.title}>              
                <Typography className={classes.headline} variant='h2'><Link className={classes.link} to="/main">Wörkbook</Link></Typography>              
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
                        <MenuItem onClick={post}>New post</MenuItem>
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

export default Header
