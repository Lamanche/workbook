import React, { useEffect, useState } from 'react'
import decode from 'jwt-decode';
import { LOGOUT } from '../../actions/types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// API
import { fetchAllPosts } from '../../api/index.js'
import { findPostsByWord } from '../../api/index.js'

// Components
import Card from '../Card.js'

// Styles
import { makeStyles, fade } from '@material-ui/core/styles';
import { Grid, Tabs, Tab, Paper, Button, GridList, GridListTile } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


const Main = () => {    
    const user = JSON.parse(localStorage.getItem('profile')); 
    let history = useHistory();
    const dispatch = useDispatch();
  
    const [posts, setPosts] = useState([])
    const [value, setValue] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const initialState = { word: '' }
    const [searchWord, setSearchWord] = useState(initialState);    

    const handleChangeSearch = (e) => {
        setSearchWord({ ...searchWord, [e.target.name]: e.target.value})
    };

    const { word } = searchWord
    const search = () => {
        if(word !== ''){            
            findPostsByWord({params: {word}})
                .then(res => {
                    setPosts(res.data.Posts)
                })
    }}

    const logout = () => {
      dispatch({ type: LOGOUT });
      history.replace("/");   
    };
        
    useEffect(() => {
        fetchAllPosts()
            .then(res => {
                const data = res.data.Posts;
                const sortedData = data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                const filterData = sortedData.filter(data => data.category.includes(value))                
                setPosts(filterData)
            })     
    },[value]) 
    
    useEffect(() => {
      const token = user?.token;
      if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
    },[])

    //Styles
    const useStyles = makeStyles((theme) => ({
        grid: {    
          width: '100%'
        },
        gridItem:{
          padding: theme.spacing(1)
        },
        card: {
          //padding: theme.spacing(2)
        },
        searchBar: {
          display: 'flex',
          //justifyContent: 'flex-end',
          "@media (max-width: 550px)": {
            flexDirection: 'column'            
          }      
        },
        gridList: {
          width: '100%',
          flexWrap: 'nowrap',
          transform: 'translateZ(0)',
          height: 50,
          overflowY: 'hidden',
          "@media (max-width: 550px)": {
            //overflow: 'scroll'            
          },
          '&::-webkit-scrollbar':{
            display: 'none'
          },        
        },
        
        tabValue: {
          "@media (max-width: 550px)": {
            fontSize: '.7rem',           
          }      
        },       
        search: {
            position: 'relative',
            display: 'flex',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.black, 0.15),
            '&:hover': {
              backgroundColor: fade(theme.palette.common.black, 0.25),
            },
            marginRight: 8,
            marginBottom: 8,
            marginTop: 8,
            //width: '100%',
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(3),
              width: 'auto',
            },
            "@media (max-width: 550px)": {
              width: 150,
              marginLeft: 10         
            }    
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
        <>            
            <Paper className={classes.searchBar} elevation={1}  square>                
              <GridList className={classes.gridList} cols={3}>
                <GridListTile>
                  <Tabs                    
                    className={classes.searchtabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    //centered
                  >
                    <Tab className={classes.tabValue} label="All" value="" />
                  </Tabs>                  
                </GridListTile>
                <GridListTile>
                <Tabs                    
                    className={classes.searchtabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    //centered
                  >
                    <Tab className={classes.tabValue} label="Coding" value="Coding" />
                  </Tabs>                 
                </GridListTile>
                <GridListTile>
                <Tabs                    
                    className={classes.searchtabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    //centered
                  >
                    <Tab className={classes.tabValue} label="Engineering" value="Engineering" />
                  </Tabs>                  
                </GridListTile>
                <GridListTile>
                <Tabs                    
                    className={classes.searchtabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    //centered
                  >
                    <Tab className={classes.tabValue} label="Design" value="Design" />
                  </Tabs>
                </GridListTile>
                <GridListTile>
                <Tabs                    
                    className={classes.searchtabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    //centered
                  >
                    <Tab className={classes.tabValue} label="Construction" value="Construction" />
                  </Tabs>
                </GridListTile>                
              </GridList>
                
                
                {/*<Tabs                    
                    className={classes.searchtabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    //centered
                >
                    <Tab className={classes.tabValue} label="All" value="" />
                    <Tab className={classes.tabValue} label="Coding" value="Coding" />
                    <Tab className={classes.tabValue} label="Engineering" value="Engineering" />
                    <Tab className={classes.tabValue} label="Design" value="Design" />
                    <Tab className={classes.tabValue} label="Construction" value="Construction" />
                </Tabs>*/}
                
                <div className={classes.search}>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    name='word'
                    onChange={handleChangeSearch}
                  />
                  <Button onClick={search}><SearchIcon className={classes.searchIcon}/></Button>
                </div>
            </Paper>                               
            <Grid className={classes.grid} container >            
                {posts.map(post => (                    
                  <Grid className={classes.gridItem} item xs={6} sm={4} md={3} lg={2}> 
                    <Card className={classes.card} key={post._id} id={post._id} date={post.createdAt} name={post.name} email={post.email} category={post.category} description={post.description}  about={post.about} picture={post.picture} creator={post.creatorId} price={post.price}/>
                  </Grid>
                ))}        
            </Grid>
        </>
    )
}

export default Main

