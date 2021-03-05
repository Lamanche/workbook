import React, { useState, useEffect } from 'react';

// Styles
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom';
import { signin } from '../../actions/auth';
import { location } from '../../actions/location';
import { googleSignIn } from'../../api/index'
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

  const register = () => {
    history.replace('/register')
  }

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const code = authResult['code']
        await googleSignIn({code: code})
          .then((res) => {
            if (res.status === 200) {
              const data = res.data
              dispatch({ type: AUTH, data });    
              history.replace('/main');
            } else {
              return Promise.reject(res);
            }
      })
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
      }
  };

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
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with google"
              responseType="code"
              redirectUri="postmessage"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          <Grid container>
            <Grid item xs>
              {/*<Link href="#" variant="body2">
                Forgot password?
              </Link>*/}
            </Grid>
            <Grid item>              
              <Link onClick={register}>              
                  {"Don't have an account? Sign Up"}              
              </Link>            
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

