import React, { useEffect, useState } from 'react'

// API
import { fetchAllPosts } from '../api/index.js'

// Components
import Card from './Card.js'

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Tabs, Tab, Paper } from '@material-ui/core'


function Main() {    
    const [posts, setPosts] = useState([])
    const [value, setValue] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    useEffect(() => {
        fetchAllPosts()
            .then(res => {
                const data = res.data.Posts;
                const sortedData = data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                const filterData = sortedData.filter(data => data.category.includes(value))                
                setPosts(filterData)
            })
            .catch(error => console.log(error))      
    },[value])    

    //Styles
    const useStyles = makeStyles(() => ({
        root: {    
        display: 'flex',
        justifyContent: 'space-around',
        },
    }));
  
    const classes = useStyles();

    
    
    return (  
        <>            
            <Paper elevation={20}  square>
                <Tabs
                    //defaultValue = ""
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="All" value="" />
                    <Tab label="Coding" value="Coding" />
                    <Tab label="Engineering" value="Engineering" />
                    <Tab label="Design" value="Design" />
                    <Tab label="Construction" value="Construction" />
                </Tabs>
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

