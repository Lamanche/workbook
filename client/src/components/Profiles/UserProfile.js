import React, { useEffect } from 'react';
import styles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import User from './User';
import Posts from '../Posts/Posts.js';
import Comments from '../Comments/Comments.js';
import { clearPostData } from '../../actions/postData.js';

import { Divider } from '@material-ui/core';


const UserProfile = () => {
    let {userId}= useParams();
    const dispatch = useDispatch();
    const history = useHistory();  
    const isLoggedIn = useSelector(state => state.auth?.isLoggedIn);
    
    // kõik muidu töötab aga kui back nuppu vajutada siis ei kustu postData ära
    useEffect(() => { 
        const unlisten = history.listen((location) => {
            if(location.pathname !== `/userprofile/${userId}`) {
                dispatch(clearPostData());
            };          
        });
        return () => {
          unlisten();
        };
      }, [history, userId, dispatch]);
    
    return (
        <div className={styles.profileContainer}>
            <div className={styles.leftSide} >                
                <Posts key={userId} userId={userId} />            
            </div>

            <Divider orientation='vertical' flexItem/>
            
            <div className={styles.rightSide}>                
                <User key={userId} userId={userId} />                
                
                {isLoggedIn ? <div className={styles.commentsContainer}>
                    <Comments key={userId} userId={userId}/>             
                    </div>  
                    :
                    <div className={styles.logInForComments}>
                        <h3 className={styles.noCommentText} >Log in to view or write comments</h3>
                    </div>
                }                         
            </div>        
        </div>
    )
}

export default UserProfile
