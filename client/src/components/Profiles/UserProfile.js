import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { loading } from '../../actions/posts';
import Posts from '../Posts/Posts.js'
import Comments from '../Comments/Comments.js'
import { fetchUserProfile } from '../../api/index.js'
import { clearPostData } from '../../actions/postData.js'
import StarRatingComponent from 'react-star-rating-component';

// Styles
import useStyles from './styles'
import { Paper, Divider, TextField, Typography, Container, Avatar, Button } from '@material-ui/core'


const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();    
    const isLoggedIn = useSelector(state => state.auth?.isLoggedIn)
    let {userId}= useParams()
    const loggedInUserId = useSelector(state => state.auth.authData?.result._id)
   
    const [profile, setProfile] = useState({})

    const updateProfile = () => {
        history.replace(`/updateprofile`)
    }

    const back = () => {
        dispatch(clearPostData())
        history.replace("/main")   
    };
    
    useEffect(() => {
        fetchUserProfile({ userId })
            .then(res => {setProfile(res.data)});        
        dispatch(loading())        
    },[userId]);
    
    
    // kõik muidu töötab aga kui back nuppu vajutada siis ei kustu postData ära
    useEffect(() => { 
        const unlisten = history.listen((location) => {
            if(location.pathname !== `/userprofile/${userId}`){
                dispatch(clearPostData())
            }          
        });
        return () => {
          unlisten();
        }
      }, [history, userId]);
    
    return (
        <Container className={classes.container} component="main" maxWidth="lg">
            <Container className={classes.boxLeft}>
                <div className={classes.leftContainer}>
                    <Paper className={classes.leftPaper} elevation={3}>
                        <Avatar src={profile?.picture} className={classes.avatar}></Avatar>                    
                        <Typography className={classes.name} variant="h3" label="name">{profile?.company === "" ? profile?.name : profile?.company}</Typography>                    
                        <StarRatingComponent 
                            name="rate2" 
                            editing={false}
                            starCount={5}
                            value={8}
                        />
                        <TextField
                            className={classes.text}
                            id="standard-read-only-input1"
                            label="About"
                            defaultValue={profile?.about}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            multiline
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.text}
                            id="standard-read-only-input2"
                            label="Experience"
                            defaultValue={profile?.experience}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            multiline
                            InputLabelProps={{ shrink: true }}
                        />                    
                        <TextField
                            className={classes.text}
                            id="standard-read-only-input3"
                            label="References"
                            defaultValue={profile?.references}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            multiline
                            InputLabelProps={{ shrink: true }}
                        /> 
                        <TextField
                            className={classes.text}
                            id="standard-read-only-input3"
                            label="Contact me"
                            defaultValue={profile?.email}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            multiline
                            InputLabelProps={{ shrink: true }}
                        /> 
                        {userId === loggedInUserId ? 
                            <Button className={classes.update} onClick={updateProfile} variant="contained" fullWidth color="primary">Update profile</Button>
                            :
                            null}             
                        <Button onClick={back} className={classes.back} variant="contained" fullWidth >Back</Button>
                    </Paper>
                </div>
                
                {isLoggedIn ? <div className={classes.comments}>
                    <Comments key={userId} userId={userId}/>             
                    </div>  
                    :
                    <h3>Log in to view or write comments</h3>
                }                         
            </Container>

            <Divider orientation='vertical' flexItem/>
            
            <Container className={classes.boxRight} >                
                <Posts key={userId} userId={userId} />            
            </Container>
        </Container>
    )
}

export default UserProfile
