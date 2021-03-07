import React, { useEffect, useState } from 'react'

//Styles
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../actions/auth';
import { location } from '../../actions/location';
import { Copyright } from './helperFunc'
import useStyles from './styles'


function Register() {    
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const profile  = JSON.parse(localStorage.getItem('profile'));
    const [radioValue, setRadioValue] = useState('eraisik');

    const initialState = { userType: 'eraisik', company: '', firstName: '', lastName: '', email: '', password: '', profile: false}
    const [formData, setFormData] = useState(initialState);

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
        setFormData({...formData, userType: event.target.value})               
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        dispatch(signup(formData, history));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    } 

    const login = () => {
        history.replace('/login')
      }
    
    useEffect(() => {
        dispatch(location(history.location.pathname))
        if (profile) {
          history.replace('/main')
        }},[history, profile, dispatch])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                
                <form className={classes.regForm} onSubmit={handleSubmit}>                   
                    <Grid item xs={12} spacing={2} >
                        <RadioGroup value={radioValue} onChange={handleRadioChange} row >                            
                            <FormControlLabel value="eraisik" control={<Radio color='primary'/>} label="Eraisik" />
                            <FormControlLabel value="ettevõte" control={<Radio color='primary'/>} label="Ettevõte" />                    
                        </RadioGroup>     
                    </Grid>
                    <Grid container spacing={2}>                        
                        {radioValue === 'ettevõte' ? 
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="company"
                                    label="Company"
                                    name="company"
                                    autoComplete="company"
                                    onChange={handleChange}
                                />
                            </Grid> : 
                            null}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleChange}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={login}>              
                                Already have an account? Sign in             
                            </Link>              
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default Register

  

  

 