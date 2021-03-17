import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';
import SideBar from '../Main/SideBar';
import SideBarSmall from '../Main/SideBarSmall';
import { categories } from '../../utils/categories';
import moment from 'moment';
import 'moment/locale/et';
import { createPost } from '../../api/index.js';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { postCategory, postUserType, postType, postCategoryType } from '../../actions/posts';
import { v4 as uuid } from 'uuid';
import { tokenExpired } from '../../actions/auth';

import { CircularProgress, Tabs, Tab, Paper, Typography, Grid, FormControl, InputLabel, MenuItem, TextField, Select, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';


const Form = () => {    
    const history = useHistory();
    const dispatch = useDispatch();
    const cats = categories.slice(1);
    const user = useSelector(state => state.auth.authData.result);
    const type = useSelector(state => state.posts.postType);
    const categoryType = useSelector(state => state.posts.postCategoryType);    
    const initialState = { id: uuid(), company: user.company, name: user.name, email: user.email, creatorId: user._id, type: type, userType: user.userType, categoryType: categoryType, picture: user.picture, category: '', description: '', about: '', price: '', deadline: '', available: true, availableFrom: '' };

    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [formData, setFormData] = useState(initialState);
    const [value, setValue] = useState(0);    

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormData({ ...formData, deadline: date });
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        if (value === 1) {
            setFormData({...formData, type: 'Otsin'});
            dispatch(postType('Otsin'));
        }
        else if (value === 0) {
            setFormData({...formData, type: 'Pakun'});
            dispatch(postType('Pakun'));
        };
    };

    const handleChange = (e) => {
        //
        console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value});
        if (e.target.name === 'category') {
            dispatch(postCategory(e.target.value));
        };        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        //
        console.log(formData)
        dispatch(postUserType(user.userType));
        createPost(formData)
        .then(res => {
            if (res.status === 201){
                setLoading(false);
                history.push('/main')
            }})
        .catch(error => {
            if (error.response.status === 401) {
                dispatch(tokenExpired());
                setLoading(false);
            };
        });        
    };    
    
    const cancel = () => {
        dispatch(postType(''));
        dispatch(postCategoryType(''));
        dispatch(postUserType(''));
        dispatch(postCategory(''));
        history.push("/main");
    };
    
    useEffect(() => {        
        if (categoryType === '') {
            dispatch(postCategoryType('Teenus'));
            setFormData({...formData, categoryType: 'Teenus'});
        }
        setFormData({...formData, categoryType: categoryType});
    },[categoryType]);

    useEffect(() => {        
        if (type === "") {
            dispatch(postType('Otsin'));
            setFormData({...formData, type: 'Otsin'});
        };        
    },[type]);

    useEffect(() => {        
        if (type === 'Otsin') {
            setValue(0);
        }
        else if (type === 'Pakun') {
            setValue(1);
        }
    },[type]);    
    
    return (
         <div className={styles.formContainer}>
            <div className={styles.formInnerContainer}>
                <Paper className={styles.formPaper} elevation={3}>
                    <div className={styles.formHeader}>
                        <Typography component="h1" variant="h4">Uus keika</Typography>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formTabs}>
                            <Tabs
                                className={styles.tabs}
                                value={value}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab value={0} icon={<SearchIcon/>} label="Otsin" />
                                <Tab value={1} icon={<LocalOfferIcon/>} label="Pakun" />
                            </Tabs>   
                        </div>
                        <div className={styles.sideBarSmall}>
                            <SideBarSmall />
                        </div> 
                        <div className={styles.formBody}>                     
                            <div className={styles.formData}> 
                                <Grid container spacing={2}>                                                           
                                    <Grid item xs={12}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel>Kategooria</InputLabel>
                                                <Select required name="category" defaultValue = "" label="Kategooria" onChange={handleChange}>
                                                    {cats.map(item => (
                                                        <MenuItem key={item.indexOf()} value={item}>{item[0].toUpperCase()+item.slice(1).toLowerCase()}</MenuItem>
                                                    ))}
                                                </Select>
                                        </FormControl>
                                    </Grid>                            
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            multiline                                        
                                            label="Pealkiri"
                                            name="description"
                                            autoComplete="description"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            multiline
                                            name="about"
                                            label="Kirjeldus"                                        
                                            autoComplete="about"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            multiline
                                            name="price"
                                            label="Hind €"                                        
                                            autoComplete="price"                                        
                                            onChange={handleChange}
                                        />                                
                                    </Grid>
                                    {categoryType === 'Hange' ?                                 
                                        <Grid item xs={12}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    disablePast
                                                    fullWidth
                                                    variant="dialog"
                                                    format="dd.MM.yyyy"
                                                    margin="normal"
                                                    label="Hanke tähtaeg"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    InputLabelProps={{ shrink: true }}
                                                    classes={{ 
                                                        root: styles.datePicker,                        
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>                  
                                        </Grid>
                                        :
                                        null
                                    }                           
                                </Grid> 
                            </div>
                            <div className={styles.formSideBar}>
                                <SideBar />
                            </div>
                            
                        </div>          
                        <div className={styles.formButtons}>                    
                            <Button className={styles.formSubmit} type="submit" fullWidth variant="contained" color="primary" disabled={loading} >{loading && <CircularProgress size={24} className={styles.buttonProgress}/>}Loo</Button>
                            <Button className={styles.formBack} onClick={cancel} fullWidth variant="contained" color="secondary">Tühista</Button>
                        </div> 
                    </form>
                </Paper>
            </div> 
         </div>
        )
    }

export default Form
