import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux'
import SideBarItem from './Main/SideBarItem'
import { postCategory } from '../actions/posts'
//import FileBase from 'react-file-base64';

// API
import { createPost } from '../api/index.js';

// Styles
import { Tabs, Tab, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BuildIcon from '@material-ui/icons/Build';
import SchoolIcon from '@material-ui/icons/School';
import AcUnitIcon from '@material-ui/icons/AcUnit';


const Form = () => {    
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const dispatch = useDispatch();  
    const postCategoryType = useSelector(state => state.posts.postCategoryType)
    const initialState = { company: user.result.company, name: user.result.name, email: user.result.email, creatorId: user.result._id, type: 'Otsin', userType: user.result.userType, categoryType: postCategoryType, picture: user.result.picture, category: '', description: '', about: '', price: ''}
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        setFormData({...formData, categoryType: postCategoryType})
    },[postCategoryType])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(formData)
        .then(res => {
            if (res.status === 201){
                history.push('/main')}
        }).catch(error => console.log(error))};
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
        if (e.target.name === 'category') {
            dispatch(postCategory(e.target.value))
        }
        console.log(e.target.name)
    };

    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        if (value === 1) {
            setFormData({...formData, type: 'Otsin'})
        }
        else if (value === 0) {
            setFormData({...formData, type: 'Pakun'})
        }
    };
    
    const back = () => history.replace("/main")
    
// Styles
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
            width: 100,
            height: 100,
        },
        tabs: {
            marginBottom: '2rem'
        },
        info: {
            display: 'flex'
        },
        sideBar: {
            margin: '2rem'
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        back: {
            marginBottom: theme.spacing(3),
        },
        }));

    const classes = useStyles();    
    
    return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} src={user.result.picture}></Avatar>
                    <Typography component="h1" variant="h4">
                        Create
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                    <Tabs
                                className={classes.tabs}
                                value={value}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab value={0} icon={<SearchIcon/>} label="Otsin" />
                                <Tab value={1} icon={<LocalOfferIcon/>} label="Pakun" />
                            </Tabs>        
                    <div className={classes.info}> 
                        <Grid container spacing={2}>                                                           
                                <Grid item xs={12}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel>Category</InputLabel>
                                            <Select required name="category" defaultValue = "" label="Category" onChange={handleChange}>
                                                <MenuItem value="engineering">Engineering</MenuItem>
                                                <MenuItem value="coding">Coding</MenuItem>
                                                <MenuItem value="design">Design</MenuItem>
                                                <MenuItem value="construction">Construction</MenuItem>
                                            </Select>
                                    </FormControl>
                                </Grid>                            
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        multiline
                                        id="description"
                                        label="Headline"
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
                                        label="Description"
                                        type="about"
                                        id="about"
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
                                        label="Price from .. €"                                    
                                        id="price"
                                        autoComplete="price"
                                        type="number"
                                        //InputLabelProps={{
                                        // shrink: true,
                                        //}}
                                        onChange={handleChange}
                                    />                                
                                </Grid>                            
                        </Grid> 
                                <div className={classes.sideBar}>
                                    <SideBarItem value="Teenus" Icon={<BuildIcon />}/>
                                    <SideBarItem value="Rent" Icon={<SettingsApplicationsIcon />}/>
                                    <SideBarItem value="Koolitus" Icon={<SchoolIcon />}/>
                                    <SideBarItem value="Hange" Icon={<BusinessCenterIcon />}/>
                                    <SideBarItem value="Varia" Icon={<AcUnitIcon />}/>
                                </div> 
                            </div>               
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create
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
                    </form>
                </div>
            </Container>
        )
    }

export default Form
