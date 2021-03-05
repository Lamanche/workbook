import React, { useState, useEffect } from 'react'
import styles from './Comments.module.css'
import AddComment from './AddComment'
import Comment from './Comment'
import Loading from './Loading'
import { fetchComments } from '../../api/index.js'
import { useSelector, useDispatch } from 'react-redux'
import { tokenExpired } from '../../actions/auth.js'


const Comments = (props) => {
    const dispatch = useDispatch();
    const userId = props.userId
    const update = useSelector(state => state.update)
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {        
        setLoading(true)
        fetchComments({params: {userId}})
            .then(res => {
                const sortedData = res.data.userComments.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                setComments(sortedData)
                setLoading(false)
            }).catch(error => {
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                    setLoading(false)
               }                           
            })
    },[update])
    
    return (
        <div>
            <AddComment userId={userId} />
            {loading === false ? 
                ((comments.length > 0) ? 
                    comments.map(comment => (
                        <Comment key={comment._id} data={comment} />
                    ))                        
                    :
                    <div className={styles.noComments}>
                        <h3 className={styles.noCommentsText}>No comments yet</h3>
                    </div>
                )
            :
            <Loading />
            }
        </div>
    )
}

export default Comments
