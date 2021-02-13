import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Styles
import { Container, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Header from './components/Header';
import LogIn from './components/Auth/LogIn.js';
import Register from './components/Auth/Register.js';
import MainContent from './components/MainContent'
import UserProfile from './components/UserProfile'
import UpdateProfile from './components/UpdateProfile.js' 
import Form from './components/Form.js';

// Kõik tundub töötavat. Ainuke probleem - back nuppu vajutades 
// ei tohiks peale audentimist tagasi LogIn lehele minna.

// Veel probleem - peale browseri sulgemist localStorages profile alles 
// aga maandub sisse logituna LogIn lehele.

function App() {  
  const profile  = JSON.parse(localStorage.getItem('profile'));
  const loggedIn = useSelector(state => state.auth.isLoggedIn)  

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

  return (
      <BrowserRouter>
        <Container className={classes.container} maxWidth="lg">
          <Paper className={classes.paper}  elevation={3} square>    
            <Header />                 
            <Box>                        
              <Switch>                
                  <Route path="/" exact component={LogIn} />                               
                  <Route path="/register" component={Register} />
                  {loggedIn || profile ? <Route path="/main" component={MainContent} /> : <Redirect to="/" exact component={LogIn} />}
                  {profile ? <Route path="/updateprofile" component={UpdateProfile} /> : <Redirect to="/" exact component={LogIn} />}                                
                  {profile ? <Route path="/form" component={Form} /> : <Redirect to="/" exact component={LogIn} />}
                  {profile ? <Route path="/userprofile" component={UserProfile} /> : <Redirect to="/" exact component={LogIn} />}  
              </Switch>            
            </Box>
          </Paper>
        </Container>
      </BrowserRouter> 
  ); 
}

export default App;
 