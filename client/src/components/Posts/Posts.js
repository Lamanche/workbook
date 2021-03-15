import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Post/Post.module.css';
import Post from './Post/Post';
import { finishedLoading } from '../../actions/posts';
import { findUserPosts } from '../../api/index.js';
import Card from '../Posts/Card.js';
import { Route } from 'react-router-dom';

import { Grid } from '@material-ui/core';

const Posts = (props) => {
    let userId= props.userId;  
    const dispatch = useDispatch();
    const update = useSelector(state => state.update);    
    const post = useSelector(state => state.postData.post);    
    const loadingState = useSelector(state => state.posts.loading); 
    
    const [posts, setPosts] = useState([]);
    const [loadingMain, setLoadingMain] = useState(false)

    useEffect(() => {        
        findUserPosts({params: { userId }})
            .then(res => {
                const data = res.data.Posts;
                const sortedData = data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                setPosts(sortedData);
                setLoadingMain(false)
                dispatch(finishedLoading());
        });
    },[update, userId, dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    
    return (
        <div className={styles.postsContainer}>
            {post ? 
                <Post key={post.id} data={post} setLoadingMain={setLoadingMain} />               
                : 
                null
            }
            <Grid className={styles.grid} container spacing={1}>                    
                    {loadingState === true || loadingMain === true ? 
                        <p>Loading...</p> 
                        :                
                        (posts.length === 0 ?                        
                            <h3 className={styles.noPosts}>Nothing to show from this user</h3>
                            :
                            posts.map(post => (                        
                                <Grid key={post._id} className={styles.gridItem} item > 
                                    <Card data={post} />
                                </Grid>
                            ))
                        )
                    }                
                </Grid>
        
        
        </div>        
    )
}

export default Posts
