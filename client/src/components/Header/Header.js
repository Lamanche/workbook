import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearProfile } from '../../actions/profile.js';
import { logout } from '../../actions/auth.js'
import { useStyles } from './styles';

// Styles
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar, Button } from '@material-ui/core';


const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useSelector(state => state.location.location);
  const user = JSON.parse(localStorage.getItem('profile'));  

  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const login = () => {
    history.push('/login')
}
  
  const profile = () => {
    dispatch(clearProfile())
    history.push("/userprofile");
    setAnchorEl(null);
  };

  const logOut = () => {
    dispatch(logout());
    history.push("/");
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
            
            {user ? (
                <div className={classes.profile}>
                  <Avatar className={classes.avatar} alt={user.result.name} src={user.result.picture || user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
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
                        <MenuItem onClick={logOut}>Logout</MenuItem>
                      </Menu>                          
                  </IconButton>                
                </div>
              ) 
              : 
              ((location ===  "/" || location === "/login" || location === "/register") ?                
                null
                :
                <div className={classes.login}>
                  <Button variant='contained' color='secondary' onClick={login}>
                    Log in
                  </Button>
                </div>
              )  
                            
            }
      </AppBar>
  );
}

export default Header
