import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'

// Styles
import { Container, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Header from './components/Header/Header';
import LogIn from './components/Auth/LogIn.js';
import Register from './components/Auth/Register.js';
import MainContent from './components/MainContent'
import UserProfile from './components/Profiles/UserProfile'
import UpdateProfile from './components/Profiles/UpdateProfile.js' 
import Form from './components/Form.js';


function App() {  
  const history = useHistory();
  const profile  = JSON.parse(localStorage.getItem('profile'));

  //Styles
  const useStyles = makeStyles(() => ({
    container: {    
      display: 'flex',
      flexDirection: 'column',
    },
    paper: {
      minHeight: '99vh',    
    }  
  }));

  const classes = useStyles();

  useEffect(() => {
    if (profile) {
      console.log(history)
      history.replace('/main')
  }})

  return (      
        <Container className={classes.container} maxWidth="lg">
          <Paper className={classes.paper}  elevation={3} square>    
            <Header />                 
            <Box>                        
              <Switch>                
                  <Route path="/" exact component={LogIn} />                                                
                  <Route path="/register" component={Register} />
                  {profile ? <Route path="/main" component={MainContent} /> : <Redirect to="/" exact component={LogIn} />}
                  {profile ? <Route path="/updateprofile" component={UpdateProfile} /> : <Redirect to="/" exact component={LogIn} />}                                
                  {profile ? <Route path="/form" component={Form} /> : <Redirect to="/" exact component={LogIn} />}
                  {profile ? <Route path="/userprofile" component={UserProfile} /> : <Redirect to="/" exact component={LogIn} />}  
              </Switch>            
            </Box>
          </Paper>
        </Container>
  ); 
}

export default App;
 