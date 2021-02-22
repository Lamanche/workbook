import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import './App.css'
import { useSelector } from 'react-redux'

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
  const history = useHistory();
  const profile  = JSON.parse(localStorage.getItem('profile'));
  const user = useSelector(state => state.auth.isLoggedIn)
  //Styles
  const useStyles = makeStyles(() => ({
    container: {    
      display: 'flex',
      flexDirection: 'column',
    },
    paper: {
      minHeight: '99vh',
      backgroundColor: 'rgb(245, 244, 243)'    
    }  
  }));

  const classes = useStyles();

  useEffect(() => {
    if (profile) {
      history.replace('/main')
  }},[history, profile])

  return (      
        <Container className={classes.container} maxWidth="lg">
          <Paper className={classes.paper}  /*elevation={5}*/ variant="outlined" square>    
            <Header />                 
            <Box>                        
              <Switch>
                  <Route path="/" exact component={Home} />            
                  <Route path="/login" exact component={LogIn} />                                                
                  <Route path="/register" component={Register} />
                  <Route path="/main" component={Main} />
                  <Route path="/userprofile" component={UserProfile} /> 
                  {profile ? <Route path="/updateprofile" component={UpdateProfile} /> : <Redirect to="/" exact component={LogIn} />}                                
                  {profile /*|| user*/ ? <Route path="/form" component={Form} /> : <Redirect to="/" exact component={LogIn} />}                   
              </Switch>            
            </Box>
          </Paper>
        </Container>
  ); 
}

export default App;
 