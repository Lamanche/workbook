import React, { useState } from 'react';
import styles from './Profile.module.css';
import { useHistory } from 'react-router-dom';
import { AUTH } from '../../actions/types';
import FileBase from 'react-file-base64';
import { useSelector, useDispatch } from 'react-redux';
import { updateMyProfile } from '../../api/index.js';

import { Avatar, Paper, Button, Container, Grid, TextField, Typography, IconButton }from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';



const UpdateProfile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const loggedInUserId = useSelector(state => state.auth.authData?.result._id);
    const user = useSelector(state => state.auth.authData);  
    
    const initialState = { about: user.result.about, experience: user.result.experience, references: user.result.references, picture: '', profile: true };
    const [formData, setFormData] = useState(initialState);    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateMyProfile(loggedInUserId, formData)
            .then(res => {
                const data = res.data;
                dispatch({ type: AUTH, data });
                history.replace('/main');
            });               
    };    

    const later = () => {
        history.replace("/main");   
    };    


    return (
        <Container className={styles.updateContainer} maxWidth="sm">
            <div className={styles.userContainer}> 
                <Paper className={styles.userPaper}>
                    <div className={styles.headerContainer}>
                        <Avatar className={styles.avatar} src={user.result.picture}></Avatar>
                        
                        
                        <div className={styles.inputContainer} id="input" >
                            <FileBase id='input' type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, picture: base64 })} />
                        </div>
                        <label htmlFor="input">                            
                            <IconButton color="primary">
                                <PhotoCamera />
                            </IconButton>
                        </label>

                        <Typography className={styles.introText} variant="h5">Tere, {user.result.name.split(" ")[0]}! Enne kui edasi liigud, kirjelda natuke ennast ja oma kogemusi.</Typography>                    
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    onChange={handleChange} 
                                    multiline 
                                    name="about" 
                                    fullWidth 
                                    label="Minust"
                                    InputProps={{                                        
                                        classes: {                                            
                                            input: styles.textField,
                                        }                                        
                                    }} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    onChange={handleChange} 
                                    multiline 
                                    name="experience" 
                                    fullWidth 
                                    label="Kogemus"
                                    InputProps={{                                        
                                        classes: {                                            
                                            input: styles.textField,
                                        }                                        
                                    }}  
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    onChange={handleChange} 
                                    multiline name="references" 
                                    fullWidth
                                    label="Soovitajad"
                                    InputProps={{                                        
                                        classes: {                                            
                                            input: styles.textField,
                                        }                                        
                                    }} 
                                />
                            </Grid>
                        </Grid>                        
                        <div className={styles.btnContainer}>
                            <Button className={styles.button} type="submit" fullWidth variant="contained" color="primary">Salvesta ja edasi</Button>
                            <Button className={styles.button} onClick={later} fullWidth variant="contained">Hiljem</Button> 
                        </div>                            
                    </form>
                </Paper>
            </div>     
        </Container>
    )
}

export default UpdateProfile
