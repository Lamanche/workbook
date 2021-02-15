import React, { useState, useEffect } from 'react';
import Icon from './icon';

// Styles
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Link as RouteLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom';
import { signin } from '../../actions/auth';
import { AUTH } from '../../actions/types';
import useStyles from './styles'
import { Copyright } from './helperFunc'


export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const profile  = JSON.parse(localStorage.getItem('profile'));

  const initialState = { email: '', password: ''}
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(signin(formData, history));      
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.replace('/main');
      localStorage.setItem('profileupdated', JSON.stringify({ updated: true }));
    } catch (error) {
      alert(error);
    }
  };

  const googleError = () => {
    alert('Google Sign In was unsuccessful. Try again later');
  }

  useEffect(() => {
    if (profile) {
      history.replace('/main')
    }})

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {/*<FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <GoogleLogin 
              clientId="847952746555-hpp742qaep7kffdi40a52fvdpmbb4qp4.apps.googleusercontent.com"              
              render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
              />
          <Grid container>
            <Grid item xs>
              {/*<Link href="#" variant="body2">
                Forgot password?
              </Link>*/}
            </Grid>
            <Grid item>              
              <RouteLink to="/register">              
                  {"Don't have an account? Sign Up"}              
              </RouteLink>            
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

