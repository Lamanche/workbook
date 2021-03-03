import React from 'react';
import styles from './Card.module.css';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPostData } from '../../actions/postData.js';

import coding from '../../images/coding.jpg';
import design from '../../images/design.jpg';
import engineering from '../../images/engineering.jpg';
import construction from '../../images/construction.jpg';

import { CardHeader, Avatar, CardMedia, Typography, Paper, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import QueueIcon from '@material-ui/icons/Queue';


const Card = ({data}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
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
    
      const userProfile = () => {
        history.push(`/userprofile/${data.creatorId}`)
      }      

      const openPost = () => {
        dispatch(setPostData(data))
        history.push(`/userprofile/${data.creatorId}`)        
      }

      const addToFav = () => {

      }
    
    return (
        <div className={styles.container}>
            <Paper className={styles.paper} variant="outlined" square>
                <div className={styles.headerContainer}> 
                  <CardHeader
                      className={styles.header}
                      classes={{ title: styles.headerText, subheader: styles.subheader}}
                      onClick={userProfile}
                      avatar={
                          <Avatar src={data.picture} className={styles.avatar}></Avatar>
                      }
                      title={data.company === "" ? data.name : data.company}
                      subheader={moment(data.createdAt).fromNow()}
                  />
                  {data.type === 'Otsin' ? 
                    <div className={styles.typeIcon}>
                      <SearchIcon/>
                    </div>
                    :
                    <div className={styles.typeIcon}>
                      <LocalOfferIcon/>
                    </div>  
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
                  <div className={styles.price}>
                    <Typography variant='h6'>Price: {data.price}€</Typography>
                  </div>
                  <div className={styles.addToFav}>
                    <Tooltip title="Add to favorites">
                      <QueueIcon onClick={addToFav} />
                    </Tooltip>
                  </div>
                </footer>
            </Paper>    
        </div>
    )
}

export default Card
