import React, { useState } from 'react';
import styles from './Header.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearProfile } from '../../actions/profile.js';
import { logout } from '../../actions/auth.js';

import { Button, Avatar, Typography, Menu, MenuItem, IconButton, Badge, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import CreateIcon from '@material-ui/icons/Create';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const Profile = ({ user, unread, setUnread }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(anchorEl)
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
        setUnread(0)
        history.push('/messages');
        setAnchorEl(null); 
      };

      const favorites = () => {
        history.push('/favourites');
        setAnchorEl(null); 
      };

      const [open, setOpen] = useState(false);
  
      const handleClose1 = () => {
          setOpen(false);
      };

      const deleteAccount = () => {
        setOpen(true);
        setAnchorEl(null);    
      };
    
    
    return (
        <div className={styles.profileContainer}>
            <Avatar className={styles.avatar} alt={user?.result.name} src={user?.result.picture || user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={styles.userName} variant="h6">{user?.result.company === "" ? user?.result.name : user?.result.company}</Typography>              
            <Badge /*invisible={anchorEl === null ? false : true}*/ badgeContent={anchorEl === null ? unread : 0} color="secondary" /*anchorOrigin={{ vertical: 'right', horizontal: 'left' }}*/>
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
                      <Badge badgeContent={unread} color="secondary" /*anchorOrigin={{ vertical: 'right', horizontal: 'left' }}*/>
                        <MenuItem onClick={messages}><MailOutlineIcon style={{marginRight: '.8rem'}}fontSize="small" />Teated</MenuItem>
                      </Badge>
                      <MenuItem onClick={favorites}><FavoriteBorderIcon style={{marginRight: '.8rem'}}fontSize="small" />Lemmikud</MenuItem>
                      <MenuItem onClick={logOut}><ExitToAppIcon style={{marginRight: '.8rem'}}fontSize="small" />Logi välja</MenuItem>
                      <MenuItem onClick={deleteAccount}><HighlightOffIcon style={{marginRight: '.8rem'}}fontSize="small" />Kustuta konto</MenuItem>
                      <Dialog
                          open={open}
                          onClose={handleClose1}                                        
                      >
                          <DialogTitle>{"Hetkel ei saa kontot kustutada. Sorry.."}</DialogTitle>
                          <DialogActions>
                              <Button onClick={handleClose1} color="primary" autoFocus>Ok</Button>
                              {/*<Button onClick={deletePost} color="secondary">Kinnita</Button>*/}
                          </DialogActions>
                      </Dialog>
                  </Menu>                     
              </IconButton> 
            </Badge>       
        </div>
    )
}

export default Profile
