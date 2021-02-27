import React, { useState } from 'react';
import styles from './Card.module.css';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProfile } from '../../actions/profile.js';
import { deletePosts } from '../../api/index';

import coding from '../../images/coding.jpg'
import design from '../../images/design.jpg'
import engineering from '../../images/engineering.jpg'
import construction from '../../images/construction.jpg'

import { CardHeader, Avatar, CardMedia, Typography, Paper, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';

const Card = ({data}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userId = JSON.parse(localStorage.getItem('profile'))?.result._id;
    const creatorId = data.creatorId;

    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const categoryImage = () => {
        switch (data.category) {
          case 'coding':
            return coding
          case 'engineering':
            return engineering
          case 'construction':
            return construction
          case 'design':
            return design    
          default:
            return ''
        }
      }
    
      const profileData = () => {
        const name = data.name
        const email = data.email
        dispatch(getProfile({ name, email }))
        history.push("/userprofile")
      }  

      const deletePost = () => {
        deletePosts(data._id)
        setAnchorEl(null);
        //window.location.reload()
      }

      const openPost = () => {
        const name = data.name
        const email = data.email
        dispatch(getProfile({ name, email }))
        localStorage.setItem('post', JSON.stringify(data))
        history.push('/userprofile')
        
      }
    
    return (
        <div className={styles.container}>
            <Paper className={styles.paper} variant="outlined" square>
                <div className={styles.headerContainer}> 
                  <CardHeader
                      className={styles.header}
                      classes={{ title: styles.headerText, subheader: styles.subheader}}
                      onClick={profileData}
                      avatar={
                          <Avatar src={data.picture} className={styles.avatar}></Avatar>
                      }
                      title={data.company === "" ? data.name : data.company}
                      subheader={moment(data.createdAt).fromNow()}
                  />
                  {userId === creatorId ? 
                    <IconButton edge="end" color="inherit">
                      <MoreIcon onClick={handleClick}/>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={deletePost}>Delete</MenuItem>
                        </Menu>                          
                    </IconButton> 
                    : 
                    null
                  }
                </div>

                <CardMedia
                    className={styles.media}
                    image={categoryImage()}
                    title="category"
                />

                <div className={styles.info}>
                    <Typography className={styles.description} onClick={openPost}>
                        {data.description}
                    </Typography>
                </div>
                
                <footer className={styles.footer}>
                  <Typography variant='h6'>Price: {data.price}€</Typography>
                </footer>
            </Paper>    
        </div>
    )
}

export default Card
