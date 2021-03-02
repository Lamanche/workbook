import React, { useState, useEffect } from 'react'
import AddComment from './AddComment'
import Comment from './Comment'
import Loading from './Loading'
import { fetchComments } from '../../api/index.js'
import { useSelector } from 'react-redux'



const Comments = (props) => {
    const email = props.email;
    const update = useSelector(state => state.update)
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {        
        setLoading(true)
        fetchComments({params: {email}})
            .then(res => {
                const sortedData = res.data.userComments.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                setComments(sortedData)
                setLoading(false)
                console.log(comments)
            })
    },[update])
    
    return (
        <div>
            <AddComment email={email} />
            {loading === false ? 
                ((comments.length > 0) ? 
                    comments.map(comment => (
                        <Comment key={comment._id} data={comment} />
                    ))                        
                    :
                    <h3>No comments yet</h3>
                )
            :
            <Loading />
            }
        </div>
    )
}

export default Comments
