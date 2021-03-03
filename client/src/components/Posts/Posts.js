import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Post/Post.module.css'
import Post from './Post/Post'
import { finishedLoading } from '../../actions/posts';
import { findUserPosts } from '../../api/index.js'
import Card from '../Posts/Card.js'

import { Grid } from '@material-ui/core'

const Posts = (props) => {
    let userId= props.userId   
    const dispatch = useDispatch();
    const update = useSelector(state => state.update)
    
    const post = useSelector(state => state.postData.post)    
    const loadingState = useSelector(state => state.posts.loading) 
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        findUserPosts({params: { userId }})
            .then(res => {
                setPosts(res.data.Posts)
                dispatch(finishedLoading())
        })
    },[update])
    
    return (
        <div>
            {post ? <Post key={post.id} data={post} /> : null}
            <Grid className={styles.grid} container spacing={1}>                    
                    {loadingState === true ? 
                        <p>Loading...</p> 
                        :                
                        posts.map(post => (                        
                            <Grid key={post._id} className={styles.gridItem} item > 
                                <Card data={post} />
                            </Grid>
                        ))
                    }                    
                </Grid>
        
        
        </div>        
    )
}

export default Posts
