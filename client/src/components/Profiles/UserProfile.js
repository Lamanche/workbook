import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { loading, finishedLoading } from '../../actions/posts';
import Post from '../Posts/Post/Post.js'

// API
import { fetchUserProfile, findUserPosts } from '../../api/index.js'
import { clearProfile } from '../../actions/profile.js'

// Styles
import useStyles from './styles'
import { Paper, Divider, TextField, Typography, Container, Avatar, Button, Grid } from '@material-ui/core'

// Components
import Card from '../Posts/Card.js'
import Comments from '../Comments/Comments.js'
import StarRatingComponent from 'react-star-rating-component';


const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();   
    
    const owner = useSelector(state => state.auth.authData)
    const user = useSelector(state => state.profile)
    const loadingState = useSelector(state => state.posts.loading)    
    const post = JSON.parse(localStorage.getItem('post'))

    let email;

    if (user?.email === "") {
        email = owner?.result.email
    }
    else if (user?.email === owner?.result.email) {
        email = owner?.result.email
    }
    else {
        email = user.email
    }
    
    const [profile, setProfile] = useState({})
    const [posts, setPosts] = useState([])
    


    const updateProfile = () => {
        history.replace('/updateprofile')
    }

    const clearProfiles = () => {
        dispatch(clearProfile())
        history.replace("/main")   
    };
    
    useEffect(() => {
        fetchUserProfile({email})
            .then(res => {setProfile(res.data)});
        
        dispatch(loading())
        findUserPosts({params: {email}})
            .then(res => {
                setPosts(res.data.Posts)
                dispatch(finishedLoading())
        })
        
        
    },[email]);
    
    
    
    
    useEffect(() => { 
        const unlisten = history.listen((location) => {
            if(location.pathname !== '/userprofile'){
                dispatch(clearProfile())
                localStorage.removeItem('post')
            }          
        });
        return () => {
          unlisten();
        }
      }, [history]);

    
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
                        {profile?._id === owner?.result._id ? 
                            <Button className={classes.update} onClick={updateProfile} variant="contained" fullWidth color="primary">Update profile</Button>
                            :
                            ''}             
                        <Button onClick={clearProfiles} className={classes.back} variant="contained" fullWidth >Back</Button>
                    </Paper>
                </div>
                
                {owner ? <div className={classes.comments}>
                    <Comments email={email}/>             
                    </div>  
                    :
                    <h3>Log in to view or write comments</h3>
                }                         
            </Container>

            <Divider orientation='vertical' flexItem/>
            
            <Container className={classes.boxRight} >
                
                {post ? <Post data={post}/> : null}
                
                <Grid className={classes.grid} container>                    
                    {loadingState === true ? 
                        <p>Loading...</p> 
                        :                
                        posts.map(post => (                        
                            <Grid key={post._id} className={classes.gridItem} item > 
                                <Card data={post} />
                            </Grid>
                    ))}                    
                </Grid>
            
            </Container>

        </Container>
    )
}

export default UserProfile
