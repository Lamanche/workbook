import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { isLoggedIn } from './actions/auth';
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

// Styles
import { Container, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LogIn from './components/Auth/LogIn.js';
import Register from './components/Auth/Register.js';
import Main from './components/Main/Main'
import UserProfile from './components/Profiles/UserProfile'
import UpdateProfile from './components/Profiles/UpdateProfile.js' 
import Form from './components/Form.js';


function App() {  
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.isLoggedIn)
  
  //Styles
  const useStyles = makeStyles(() => ({
    container: {    
      display: 'flex',
      flexDirection: 'column',
    },
    paper: {
      minHeight: '99vh',
      backgroundColor: 'rgb(245, 244, 243)'  
      //backgroundColor: '#263238'  
    }  
  }));

  const classes = useStyles();


  useEffect(() => {
    dispatch(isLoggedIn())
  },[loggedIn])

  return (      
        <Container className={classes.container} maxWidth="lg">
          <Paper className={classes.paper} variant="outlined" square>    
            <Header />                 
            <Box>                        
              <Switch>
                  <Route path="/" exact component={Home} />            
                  <Route path="/login" exact component={LogIn} />                                                
                  <Route path="/register" exact component={Register} />
                  <Route path="/main" exact component={Main} />
                  <Route path="/userprofile" exact component={UserProfile} /> 
                  {loggedIn === true ? <Route path="/updateprofile" exact component={UpdateProfile} /> : <Redirect to="/main" exact component={Main} />}                                
                  {loggedIn === true ? <Route path="/form" exact component={Form} /> : <Redirect to="/main" exact component={Main} />}                   
              </Switch>            
            </Box>
          </Paper>
        </Container>
  ); 
}

export default App;
 