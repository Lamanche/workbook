import React from 'react'
import styles from './Comments.module.css'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { update } from '../../actions/update.js'
import { deleteComment } from '../../api/index.js'
import { getProfile } from '../../actions/profile.js'

import { Avatar, Typography, Paper } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Comment = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))?.result 
  const id = props.id

  const deleteCom = () => {
    deleteComment(id)
      .then(dispatch(update(1)))
  }

  const getUserProfile = () => {
    const name = props.author
    const email = props.email
    dispatch(getProfile({ name, email }))
    history.push(`/userprofile`)
  }  
  
  return (
          <div className={styles.commentContainer}>
            <Paper className={styles.commentPaper} elevation={3}>
              <div className={styles.commentHeader}>
                <div className={styles.headerProfile}>
                  <Avatar className={styles.avatar} src={props.picture} />
                  <div className={styles.headerText}>
                    <Typography onClick={getUserProfile} className={styles.name}>{props.author}</Typography>
                    <Typography className={styles.date} variant='subtitle2'>{moment(props.date).fromNow()}</Typography>
                  </div>
                </div> 
                {user?.email === props.email ? 
                  <div onClick={deleteCom} className={styles.deleteIcon}><DeleteForeverIcon /></div> 
                  : 
                  null
                }
              </div>
              <div className={styles.commentBody}>
                <Typography className={styles.comment} variant='body1'>{props.comment}</Typography>
              </div>
            </Paper>
          </div>
  )
}

export default Comment
