import React, { useState } from 'react'
import styles from './Offer.module.css';
import moment from 'moment';
import 'moment/locale/et'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Avatar, Typography, Paper, CircularProgress } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const Offer = ({ data }) => {
    const history = useHistory();
    const loggedInUserId = useSelector(state => state.auth.authData?.result._id);
  
    const [loading, setLoading] = useState(false);
  
    const userProfile = () => {
      history.push(`/userprofile/${data.author}`);
    };

    return (
        <div className={styles.commentContainer}>
            <Paper className={styles.commentPaper} elevation={3}>
                <div className={styles.commentHeader}>
                    <div className={styles.headerProfile}>
                    <Avatar className={styles.avatar} src={data.picture} />
                    <div className={styles.headerText}>
                        <Typography onClick={userProfile} className={styles.name}>{data.authorName}</Typography>
                        <Typography className={styles.date} variant='subtitle2'>{moment(data.createdAt).fromNow()}</Typography>
                    </div>
                    </div> 
                    {loggedInUserId === data.authorId ? 
                    (loading === false ? 
                        <div className={styles.deleteIcon}><DeleteForeverIcon /></div>
                    :
                    <CircularProgress />
                    )                  
                    : 
                    null
                    }
                </div>
                {data.information.length > 1 ? 
                    <div className={styles.commentBody}>
                        <Typography className={styles.comment} variant='body1'>{data.information}</Typography>                
                    </div>
                    :
                    null
                }               
                <div className={styles.offerPrice}>
                    <Typography className={styles.comment} variant='h6'>Pakkumine €: {data.price}</Typography>
                </div>
    
            </Paper>
          </div>
    )
}

export default Offer
