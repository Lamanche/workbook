import React, { useState } from 'react';
import styles from './Comments.module.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { update } from '../../actions/update.js';
import { deleteComment } from '../../api/index.js';

import { Avatar, Typography, Paper, CircularProgress } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Comment = ({data}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInUserId = useSelector(state => state.auth.authData?.result._id);
  const id = data._id;

  const [loading, setLoading] = useState(false);

  const deleteCom = () => {
    setLoading(true);
    deleteComment(id)
      .then(setLoading(false))
      .then(dispatch(update(1)));     
  };

  const userProfile = () => {
    history.push(`/userprofile/${data.authorId}`);
  };
  
  return (
          <div className={styles.commentContainer}>
            <Paper className={styles.commentPaper} elevation={3}>
              <div className={styles.commentHeader}>
                <div className={styles.headerProfile}>
                  <Avatar className={styles.avatar} src={data.picture} />
                  <div className={styles.headerText}>
                    <Typography onClick={userProfile} className={styles.name}>{data.author}</Typography>
                    <Typography className={styles.date} variant='subtitle2'>{moment(data.createdAt).fromNow()}</Typography>
                  </div>
                </div> 
                {loggedInUserId === data.authorId ? 
                  (loading === false ? 
                    <div onClick={deleteCom} className={styles.deleteIcon}><DeleteForeverIcon /></div>
                  :
                  <CircularProgress />
                  )                  
                  : 
                  null
                }
              </div>
              <div className={styles.commentBody}>
                <Typography className={styles.comment} variant='body1'>{data.comment}</Typography>
              </div>
            </Paper>
          </div>
  )
}

export default Comment
