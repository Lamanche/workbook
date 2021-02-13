import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// API
import { deleteComment } from '../../api/index.js'
import { getProfile } from '../../actions/profile.js'

//Styles
import { Avatar, Grid, Divider, Typography, Button } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Comment = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile')).result 
  const id = props.id

  const deleteCom = () => {
    deleteComment(id).then(window.location.reload())
  }

  const getProfiles = () => {
    const name = props.author
    const email = props.email
    dispatch(getProfile({ name, email }))
    history.replace("/userprofile")
  }
  
  return (
        <>
          <div style={{display: 'flex'}}>
          <Grid  style={{width: '100%', display: 'flex'}} >          
            <Avatar src={props.picture} />
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
              <Grid onClick={getProfiles}>
                <Typography style={{fontWeight: 'bold', fontSize: '.95rem'}}>{props.author}</Typography>
                <Typography variant='subtitle2'>{moment(props.date).fromNow()}</Typography>                  
              </Grid>
              <Grid container wrap="nowrap" style={{marginTop: 10}}>
                <Grid item>
                  <Typography variant='body1'>{props.comment}</Typography>
                </Grid>                  
              </Grid>
            </div>
          </Grid>
          {user.email === props.email ? <div style={{justifyContent: 'flex-end'}}><Button onClick={deleteCom}><DeleteForeverIcon /></Button></div> : null}       
          </div>
          <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        </>
    )
}

export default Comment
