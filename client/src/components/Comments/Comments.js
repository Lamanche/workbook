import React from 'react'
import AddComment from './AddComment'
import Comment from 'Comment'

const Comments = ({data}) => {
    return (
        <div>
            <AddComment />
            <Comment props={data} />
        </div>
    )
}

export default Comments
