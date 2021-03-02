import React from 'react'
import styles from './Comments.module.css'

import { CircularProgress } from '@material-ui/core';

const Loading = () => {
    return (
        <div className={styles.loading}>
            <CircularProgress />
        </div>
    )
}

export default Loading
