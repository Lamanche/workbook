import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH } from '../../actions/types';
import { useHistory } from 'react-router-dom';
import { fetchUserProfile } from '../../api/index.js';
import { loading } from '../../actions/posts';
import { clearPostData } from '../../actions/postData.js';
import { updateMyProfile } from '../../api/index.js';
import StarRatingComponent from 'react-star-rating-component';

import { Paper, TextField, Typography, Avatar, Button, CircularProgress } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';


const User = (props) => {
    const userId = props.userId;
    const loggedInUserId = useSelector(state => state.auth.authData?.result._id);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [success, setSuccess] = useState(false);
    const [profile, setProfile] = useState({});
    const [modify, setModify] = useState(false);
    
    const [formData, setFormData] = useState({ about: '', experience: '', references: '', profile: true });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    
    const updateProfile = () => {
        setModify(true);
    };

    const cancelUpdate = () => {
        setModify(false);
        setFormData({ about: profile.about, experience: profile.experience, references: profile.references, profile: true});
    };

    const submitProfileUpdate = (e) => {
        e.preventDefault();
        setLoadingUpdate(true)
        updateMyProfile(loggedInUserId, formData)
            .then(res => {                
                setProfile(res.data);                
                const data = res.data;
                dispatch({ type: AUTH, data });
                setLoadingUpdate(false)
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setModify(false);
                }, 1000); 
            });
    };
    
    const back = () => {
        dispatch(clearPostData());
        history.replace("/main");  
    };

    useEffect(() => {
        fetchUserProfile({ userId })
            .then(res => {
                setProfile(res.data)
                setFormData({ about: res.data.about, experience: res.data.experience, references: res.data.references, profile: true})
            });        
        dispatch(loading());        
    },[userId, dispatch]);
    
    return (
        <div className={styles.userContainer}>
            <Paper className={styles.userPaper} elevation={3}>
                <div className={styles.headerContainer}>
                    <Avatar src={profile?.picture} className={styles.avatar}></Avatar>                    
                    <Typography className={styles.userName} variant="h2" label="name">{profile?.company === "" ? profile?.name : profile?.company}</Typography>                    
                    <StarRatingComponent 
                        name="rate2" 
                        editing={false}
                        starCount={5}
                        value={8}
                    />
                </div>
                <form onSubmit={submitProfileUpdate} className={styles.form}>
                    <TextField
                        onChange={handleChange}
                        className={styles.text}
                        name= 'about'
                        label="Minust"
                        value={modify === false ? profile.about : undefined}
                        defaultValue={profile.about}
                        fullWidth                        
                        InputProps={{
                            readOnly: modify === true ? false : true,
                            classes: {
                                root: modify === true ? styles.textModify : styles.description,
                                input: styles.textField,
                            },
                            endAdornment: (
                                modify === true ? <CreateIcon/> : null
                            ),
                        }}
                        multiline
                        InputLabelProps={{ shrink: true }}
                    />                
                    <TextField
                        onChange={handleChange}
                        className={styles.text}
                        name='experience'
                        label="Kogemus"
                        value={modify === false ? profile.experience : undefined}
                        defaultValue={profile?.experience}
                        fullWidth                        
                        InputProps={{
                            readOnly: modify === true ? false : true,
                            classes: {
                                root: modify === true ? styles.textModify : styles.description,
                                input: styles.textField,
                            },
                            endAdornment: (
                                modify === true ? <CreateIcon/> : null
                            ),
                        }}
                        multiline
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        onChange={handleChange}
                        className={styles.text}
                        name='references'
                        label="Soovitajad"
                        value={modify === false ? profile.references : undefined}
                        defaultValue={profile?.references}
                        fullWidth                        
                        InputProps={{
                            readOnly: modify === true ? false : true,
                            classes: {
                                root: modify === true ? styles.textModify : styles.description,
                                input: styles.textField,
                            },
                            endAdornment: (
                                modify === true ? <CreateIcon/> : null
                            ),
                        }}
                        multiline
                        InputLabelProps={{ shrink: true }}
                    />                
                    <TextField
                        className={styles.text}
                        label="Kontakt"
                        defaultValue={profile?.email}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            classes: {                        
                                input: styles.textField,
                            },
                        }}
                        multiline
                        InputLabelProps={{ shrink: true }}
                    />
                </form>
                {userId === loggedInUserId ? 
                    (modify === false ? 
                        <Button className={styles.modifyBtn} onClick={updateProfile} variant="contained" fullWidth color="primary">Muuda profiili</Button>
                        :
                        <div className={styles.updateBtnContainer}>
                            <Button onClick ={submitProfileUpdate} classes={{root: styles.updateBtn}} className={styles.submitUpdateBtn} variant='contained' color='primary' disabled={loadingUpdate || success}>{loadingUpdate && <CircularProgress size={24} className={styles.buttonProgress}/>}{success && <DoneIcon color="primary" className={styles.success}/>}Uuenda</Button>
                            <Button onClick ={cancelUpdate} className={styles.cancelUpdateBtn} variant='contained' color='secondary'>Tühista</Button>
                        </div>
                    )                    
                    :
                    null
                }             
                <Button onClick={back} className={styles.backBtn} variant="contained" fullWidth >Pealehele</Button>
            </Paper>
        </div>
    )
}

export default User
