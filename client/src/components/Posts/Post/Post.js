import React from 'react'
import styles from './Post.module.css'

import { TextField, Paper } from '@material-ui/core'

const Post = ({data}) => {
    return (
        <div className={styles.container}>
            <Paper className={styles.paper}>
                <TextField
                    className={styles.text}
                    label="Description"
                    defaultValue={data?.description}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                    multiline
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    className={styles.text}
                    label="Details"
                    defaultValue={data?.about}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                    multiline
                    InputLabelProps={{ shrink: true }}
                />                    
                <TextField
                    className={styles.text}
                    label="Price"
                    defaultValue={data?.price}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                    multiline
                    InputLabelProps={{ shrink: true }}
                /> 
                 <TextField
                   className={styles.text}
                    id="standard-read-only-input3"
                    label="Contact me"
                    //defaultValue={profile?.email}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                    multiline
                    InputLabelProps={{ shrink: true }}
                /> 
            </Paper>
        </div>
    )
}

export default Post
