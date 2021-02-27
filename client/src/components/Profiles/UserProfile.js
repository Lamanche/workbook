import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { loading, finishedLoading } from '../../actions/posts';
import Post from '../Posts/Post/Post.js'

// API
import { fetchUserProfile, findUserPosts, fetchComments } from '../../api/index.js'
import { clearProfile } from '../../actions/profile.js'

// Styles
import useStyles from './styles'
import { Paper, Divider, TextField, Typography, Container, Avatar, Button, Grid } from '@material-ui/core'

// Components
import Card from '../Posts/Card.js'
import Comment from '../Comments/Comment.js'
import AddComment from '../Comments/AddComment.js'
import StarRatingComponent from 'react-star-rating-component';


const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();   
    
    const owner = useSelector(state => state.auth.authData)
    const user = useSelector(state => state.profile)
    const loadingState = useSelector(state => state.posts.loading)
    const update = useSelector(state => state.update)
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
    const [comments, setComments] = useState([])


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
        console.log(update)
        fetchComments({params: {email}})
            .then(res => {
                const sortedData = res.data.userComments.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                setComments(sortedData)})
    },[update, email])
    
    
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
                    <Paper className={classes.leftPaper}>
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
                
                {owner ? <Container className={classes.comments}>
                    <AddComment email={email}/>
                    {comments.length > 0 ? 
                        comments.map(comment => (
                            <Comment key={comment._id} id={comment._id} date={comment.createdAt} author={comment.author} picture={comment.picture} comment={comment.comment} email={comment.authorEmail}/>
                        ))                        
                        :
                        <Typography style={{marginBottom: 30}}>No comments yet</Typography>
                    }                    
                </Container>  
                :
                <h3>Log in to view or write comments</h3>}                         
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
