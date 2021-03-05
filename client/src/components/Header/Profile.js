import React, { useState } from 'react'
import styles from './Header.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearProfile } from '../../actions/profile.js';
import { logout } from '../../actions/auth.js';

import { Avatar, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';


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
        dispatch(clearProfile())
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

      const favorites = () => {

      }

      const deleteAccount = () => {
          
      }
    
    
    return (
        <div className={styles.profileContainer}>
            <Avatar className={styles.avatar} alt={user?.result.name} src={user?.result.picture || user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={styles.userName} variant="h6">{user?.result.name}</Typography>              
            <IconButton edge="end" color="inherit">
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
                    <MenuItem onClick={favorites}>Favorites</MenuItem>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                    <MenuItem onClick={deleteAccount}>Delete account</MenuItem>
                </Menu>                     
            </IconButton>        
        </div>
    )
}

export default Profile
