import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';

// API
import { updateMyProfile } from '../api/index.js'

// Styles
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const UpdateProfile = () => {
    let history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    //const prevPicture = user.result.picture;   
    const id = user.result._id
    const updated = JSON.parse(localStorage.getItem('profileupdated'));
    
    // Probleem - kui profiili uuendades uuesti pilti ei lisas siis kustub vana
    // pilt ära aga default väärtuseks vana pilt sisestades viskab back-end mingi errori.
    const initialState = { about: user.result.about, experience: user.result.experience, references: user.result.references, picture: '', profile: true}
    const [formData, setFormData] = useState(initialState);    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateMyProfile(id, formData)
            .then(res => {
                localStorage.setItem('profileupdated', JSON.stringify({ updated: true }));
                const token = JSON.parse(localStorage.getItem('profile')).token;    
                localStorage.setItem('profile', JSON.stringify({ result: res.data, token }));                
                history.push('/userprofile')
                window.location.reload()
            })                
    };    

    // Navigation
    const continueToMain = () => {
        localStorage.setItem('profileupdated', JSON.stringify({ updated: true }));
        history.replace("/main");   
      };

    const back = () => {
        history.replace("/userprofile");   
    };

// Styles
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
        },
        avatar: {
            margin: theme.spacing(1),
            width: 100,
            height: 100,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        btnContainer: {
            width: '100%'
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        back: {
            marginBottom: theme.spacing(3),
        },
        input: {
            display: 'none',
        },
        }));

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} src={user.result.picture}></Avatar>
                    
                    <div /*className={classes.input}*/id="icon-button-file" >
                        <FileBase  type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, picture: base64 })} />
                    </div>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>


                    {!updated ? 
                        <Typography component="h1" variant="h5">
                            Hello, {user.result.name.split(" ")[0]}!
                            Before continuing, please fill in your profile info.
                        </Typography> 
                        : 
                        <Typography component="h1" variant="h5">
                            Update your profile.
                        </Typography>
                    }                    
                    
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField className={classes.text} onChange={handleChange} multiline name="about" fullWidth id="standard-required1" label="About" defaultValue={user.result.about} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.text} onChange={handleChange} multiline name="experience" fullWidth id="standard-required2" label="Experience" defaultValue={user.result.experience} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.text} onChange={handleChange} multiline name="references" fullWidth id="standard-required3" label="References" defaultValue={user.result.references} />
                            </Grid>
                            <div className={classes.fileInput}>                                
                                                                
                            </div>
                        </Grid>
                        
                        {!updated ? 
                            <Container className={classes.btnContainer}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                Save profile and continue
                                </Button>
                                <Button
                                    type=""
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.back}
                                    onClick={continueToMain}
                                >
                                Later
                                </Button> 
                            </Container>
                            : 
                            <div className={classes.btnContainer}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                Update
                                </Button>
                                <Button
                                    type=""
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.back}
                                    onClick={back}
                                >
                                Cancel
                                </Button>
                            </div>
                        }                        
                    </form>
                </div>
        </Container>
    )
}

export default UpdateProfile
