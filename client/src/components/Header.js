import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../actions/types';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { findPostsByWord } from '../api/index.js'

// Styles
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


export default function ProminentAppBar() {
  const dispatch = useDispatch();
  let history = useHistory();

  const signedIn = useSelector(state => state.auth.isLoggedIn);
  const user = JSON.parse(localStorage.getItem('profile'));  

  const [anchorEl, setAnchorEl] = useState(null);
  
  // Functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const profile = () => {
    history.replace("/userprofile");
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.replace("/");
    setAnchorEl(null);    
  };

  const form = () => {
    history.replace("/form");
    setAnchorEl(null);   
  };

  
  const initialState = { word: '' }
  const [searchWord, setSearchWord] = useState(initialState);    

  const handleChange = (e) => {
      setSearchWord({ ...searchWord, [e.target.name]: e.target.value})
  };

  const { word } = searchWord
  const search = () => {
    findPostsByWord({params: {word}}).then(res => console.log(res.data.Posts))
  }
  

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  },[user?.token])

// Styles
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      height: 158
    },
    toolbar: {
      height: '100%',
      alignItems: 'flex-start',
      paddingTop: 8, 
      paddingBottom: 10,
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-end',
      fontWeight: 'bold'
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    },
    profileRoot: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative'
    },
    profile: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    avatar: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 20,
      marginTop: 4
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 10,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: 7,
      marginBottom: 15,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      //padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}position="static">
        <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h2" noWrap>
              <Link className={classes.link} to="/main">
                <Typography className={classes.title} variant='h2'>Wörkbook</Typography>
              </Link>
            </Typography>
            
            {user || signedIn ? (
              <div className={classes.profileRoot}>
                <div className={classes.profile}>
                  <Avatar className={classes.avatar} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>              
                  <IconButton aria-label="display more actions" edge="end" color="inherit">
                    <MoreIcon onClick={handleClick} />
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}                        
                        onClose={handleClose}
                        >
                        <MenuItem onClick={form}>New post</MenuItem>
                        <MenuItem onClick={profile}>My profile</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </Menu>                          
                  </IconButton>                
                </div>
                
                <div className={classes.search}>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    name='word'
                    onChange={handleChange}
                  />
                  <Button onClick={search}><SearchIcon /></Button>
                </div>
              </div>
              ) 
              : 
              null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
