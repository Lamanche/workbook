import React, { useEffect, useState } from 'react'

// API
import { fetchAllPosts } from '../api/index.js'
import { findPostsByWord } from '../api/index.js'

// Components
import Card from './Card.js'

// Styles
import { makeStyles, fade } from '@material-ui/core/styles';
import { Grid, Tabs, Tab, Paper, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


function Main() {    
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
        }
        
    }
        
    useEffect(() => {
        fetchAllPosts()
            .then(res => {
                const data = res.data.Posts;
                const sortedData = data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                const filterData = sortedData.filter(data => data.category.includes(value))                
                setPosts(filterData)
            })     
    },[value])    

    //Styles
    const useStyles = makeStyles((theme) => ({
        root: {    
        display: 'flex',
        justifyContent: 'space-around',
        },
        searchBar: {
            display: 'flex',
            justifyContent: 'flex-end',
            
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
        <>            
            <Paper className={classes.searchBar} elevation={20}  square>
                <Tabs                    
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    //centered
                >
                    <Tab label="All" value="" />
                    <Tab label="Coding" value="Coding" />
                    <Tab label="Engineering" value="Engineering" />
                    <Tab label="Design" value="Design" />
                    <Tab label="Construction" value="Construction" />
                </Tabs>
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
            <Grid className={classes.root} container >            
                {posts.map(post => (                    
                    <Card key={post._id} id={post._id} date={post.createdAt} name={post.name} email={post.email} category={post.category} description={post.description}  about={post.about} picture={post.picture} creator={post.creatorId} price={post.price}/>
                ))}        
            </Grid>
        </>
    )
}

export default Main

