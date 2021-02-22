import React, { useEffect, useState } from 'react';
import Card from '../Card';
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
    const postcategoryType = useSelector(state => state.posts.postCategoryType)
    const loadingState = useSelector(state => state.posts.loading)
    
    /*let type
    let subCategory
    let categoryType

    if (!postType === "") {
        type = postType
    } else {
        type = null
    }
    
    }
    if (loadingState) {
        categoryType = postcategoryType
    } else {
        categoryType = null
    }*/

    /*const withType = () => {          
        dispatch(loading())
        //const type = postType
        //const category = null
        findPosts({params: {/*type,*/ /*category*//*}})*/
    /*        .then(res => {
                setPosts(res.data.posts)
                dispatch(finishedLoading())
            })
    }*/

    /*const noType = () => {
        dispatch(loading())
        findPosts()
            .then(res => {
                setPosts(res.data.posts)
                dispatch(finishedLoading())
            })
    }*/
    
    let type
    let userType
    /*let categoryType*/
    
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

    useEffect(() => {        
        dispatch(loading())
        findPosts({params: {type, userType/*, categoryType*/}})
            .then(res => {
                const data = res.data?.posts;
                const sortedData = data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                setPosts(sortedData)
                dispatch(finishedLoading())
            })            
    },[dispatch, type, userType/*, categoryType*/]) 
    
    
    return (
        <Grid className={styles.grid} container> 
            {loadingState === true ? 
                <p>Loading...</p> 
                :                 
                <>
                    {posts.length === 0 ? 
                    <h3>Nothing to show yet</h3>
                    : 
                    posts.map(post => (
                        <Grid key={post._id} item lg={3} md={4} sm={6} xs={12}>
                            <Card id={post._id} date={post.createdAt} name={post.name} company={post.company} email={post.email} category={post.category} description={post.description}  about={post.about} picture={post.picture} creator={post.creatorId} price={post.price}/>                            
                        </Grid>
                    ))} 
                </>
            }                    
        </Grid>            
    )
}

export default Content
