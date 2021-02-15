import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

// API
import { fetchUserProfile, findUserPosts, fetchComments } from '../../api/index.js'
import { clearProfile } from '../../actions/profile.js'

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { Divider, TextField, Typography, Container, Avatar, Button, Grid } from '@material-ui/core'

// Components
import Card from '../Card.js'
import Comment from '../Comments/Comment.js'
import AddComment from '../Comments/AddComment.js'
import StarRatingComponent from 'react-star-rating-component';


const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();      
    
    const owner = JSON.parse(localStorage.getItem('profile'));
    const user = JSON.parse(localStorage.getItem('user'));
    
    let name;
    let email;

    if (!user || user?.email === owner.result.email) {
        name = owner.result.name;
        email = owner.result.email
    }
    else {
        name = user.name
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
        history.push("/main")
        //history.goBack()    
    };
    
    useEffect(() => {        
        fetchUserProfile({name}).then(res => setProfile(res.data));
        findUserPosts({params: {name}}).then(res => setPosts(res.data.Posts))
        fetchComments({params: {email}}).then(res => {
            const sortedData = res.data.userComments.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
            setComments(sortedData)})
    },[name, email]);    
    
    
    useEffect(() => { 
        const unlisten = history.listen((location) => {
            if(location.pathname !== '/userprofile'){
                dispatch(clearProfile())
            }          
        });
        return () => {
          unlisten();
        }
      }, [dispatch, history]);
      

//Styles
    const useStyles = makeStyles((theme) => ({
        container: {    
            display: 'flex',
            justifyContent: 'center',
            '@media (max-width: 550px)': {
                flexDirection: 'column'
            },
          },
          name: {
              fontWeight: 'bold',
              '@media (max-width: 550px)': {
                fontSize: '2rem'
            },
          },
          text: {
              marginTop: 20,        
          },
          boxLeft: {
              marginTop: theme.spacing(8),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
          },
          boxRight: {
            marginTop: theme.spacing(8),
          },
          comments: {
            width: '100%'
          },
          grid: {
            display: 'flex',
            width: '100%'
          },
          gridItem:{
            padding: theme.spacing(1)
          },
          avatar: {
              margin: theme.spacing(1),
              width: 100,
              height: 100,
              '@media (max-width: 550px)': {
                width: 90,
              height: 90,
            },
          },
          update: {
            marginTop: theme.spacing(3),
          },
          back: {
            margin: theme.spacing(3, 0, 2),
          },
          
    }));
  
    const classes = useStyles();
    
    return (
        <Container className={classes.container} component="main" maxWidth="lg">
            <Container className={classes.boxLeft}>
                <Avatar src={profile.picture} className={classes.avatar}></Avatar>                    
                <Typography className={classes.name} variant="h3" label="name">{profile.name}</Typography>                    
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
                    defaultValue={profile.about}
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
                    defaultValue={profile.experience}
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
                    defaultValue={profile.references}
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
                    defaultValue={profile.email}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                    multiline
                    InputLabelProps={{ shrink: true }}
                /> 
                {profile._id === owner.result._id ? 
                    <Button className={classes.update} onClick={updateProfile} variant="contained" fullWidth color="primary">Update profile</Button>
                    :
                    ''}             
                <Button onClick={clearProfiles} className={classes.back} variant="contained" fullWidth >Back</Button>
            
                <Container className={classes.comments}>
                    <AddComment email={email}/>
                    {comments.length > 0 ? 
                        comments.map(comment => (
                            <Comment key={comment._id} id={comment._id} date={comment.createdAt} author={comment.author} picture={comment.picture} comment={comment.comment} email={comment.authorEmail}/>
                        ))                        
                        :
                        <Typography style={{marginBottom: 30}}>No comments yet</Typography>
                    }                    
                </Container>            
            </Container>

            <Divider orientation='vertical' flexItem/>
            
            <Container className={classes.boxRight} >
                <Grid className={classes.grid} container>
                    {posts.map(post => (
                        <Grid className={classes.gridItem} item xs={12} sm={9} md={6} lg={5}> 
                            <Card key={post._id} id={post._id} date={post.createdAt} name={post.name} email={post.email} category={post.category} description={post.description}  about={post.about} picture={post.picture} creator={post.creatorId} price={post.price}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    )
}

export default UserProfile
