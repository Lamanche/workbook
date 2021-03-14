import React, { useState } from 'react';
import styles from './Header.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearProfile } from '../../actions/profile.js';
import { logout } from '../../actions/auth.js';

import { Avatar, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import CreateIcon from '@material-ui/icons/Create';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const Profile = ({user}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const profile = () => {
        dispatch(clearProfile());
        history.push(`/userprofile/${user.result._id}`);
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

      const messages = () => {
        history.push('/messages');
        setAnchorEl(null); 
      };

      const favorites = () => {
        history.push('/favourites');
        setAnchorEl(null); 
      };

      const deleteAccount = () => {
          
      };
    
    
    return (
        <div className={styles.profileContainer}>
            <Avatar className={styles.avatar} alt={user?.result.name} src={user?.result.picture || user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={styles.userName} variant="h6">{user?.result.company === "" ? user?.result.name : user?.result.company}</Typography>              
            <IconButton edge="end" color="inherit">
                <MoreIcon onClick={handleClick} />
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}                        
                    onClose={handleClose}
                >
                    <MenuItem onClick={post}><CreateIcon style={{marginRight: '.8rem'}}fontSize="small" />Uus keika</MenuItem>
                    <MenuItem onClick={profile}><PersonOutlineIcon style={{marginRight: '.8rem'}}fontSize="small" />Minu profiil</MenuItem>
                    <MenuItem onClick={messages}><MailOutlineIcon style={{marginRight: '.8rem'}}fontSize="small" />Teated</MenuItem>
                    <MenuItem onClick={favorites}><FavoriteBorderIcon style={{marginRight: '.8rem'}}fontSize="small" />Lemmikud</MenuItem>
                    <MenuItem onClick={logOut}><ExitToAppIcon style={{marginRight: '.8rem'}}fontSize="small" />Logi välja</MenuItem>
                    <MenuItem onClick={deleteAccount}><HighlightOffIcon style={{marginRight: '.8rem'}}fontSize="small" />Kustuta konto</MenuItem>
                </Menu>                     
            </IconButton>        
        </div>
    )
}

export default Profile
