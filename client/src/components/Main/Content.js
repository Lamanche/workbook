import React, { useEffect, useState } from 'react';
import Card from '../Posts/Card';

import { findPosts } from '../../api/index';
import { useSelector, useDispatch } from 'react-redux';
import { loading, finishedLoading } from '../../actions/posts';

import styles from './Main.module.css';
import { Grid } from '@material-ui/core';

const Content = () => {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([])
    const postType = useSelector(state => state.posts.postType)
    const postUserType = useSelector(state => state.posts.postUserType)
    const postCategory = useSelector(state => state.posts.postCategory)
    const postCategoryType = useSelector(state => state.posts.postCategoryType)
    const loadingState = useSelector(state => state.posts.loading)
    
    
    let type
    let userType
    let category
    let categoryType    
    
    if (postType === "") {
        type = null
    } else {
        type = postType
    }
    if (postUserType === "") {
        userType = null
    } else {
        userType = postUserType
    }
    if (postCategoryType === "") {
        categoryType = null
    } else {
        categoryType = postCategoryType
    }
    if (postCategory === "" || postCategory === 'kõik') {
        category = null
    } else {
        category = postCategory
    }

    useEffect(() => {        
        dispatch(loading())
        findPosts({params: {type, userType, category, categoryType}})
            .then(res => {
                const data = res.data?.posts;
                const sortedData = data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                setPosts(sortedData)
                dispatch(finishedLoading())
            })            
    },[dispatch, type, userType, category, categoryType]) 
    
    
    return (
        <Grid className={styles.grid} container spacing={1}> 
            {loadingState === true ? 
                <p>Loading...</p> 
                :                 
                <>
                    {posts.length === 0 ? 
                    <h3>Nothing to show yet</h3>
                    : 
                    posts.map(post => (                        
                        <Grid key={post._id} item >
                            <Card data={post}/>                            
                        </Grid>
                    ))} 
                </>
            }                    
        </Grid>            
    )
}

export default Content
