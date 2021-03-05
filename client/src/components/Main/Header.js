import React, { useState, useEffect } from 'react'
import styles from './Main.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { postUserType } from '../../actions/posts'

import { Typography, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

const Header = () => {
    const dispatch = useDispatch()
    const type = useSelector(state => state.posts.postType)
    const userType = useSelector(state => state.posts.postUserType)

    const [value, setValue] = useState(userType);

    const handleChange = (event) => {
        setValue(event.target.value);
        dispatch(postUserType(event.target.value))        
    };

    useEffect(() => {
        setValue(userType);
    },[userType])

    
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerSubContainer}>
                <Typography className={styles.headerText}variant='h4'>{type ? <span>{type} teenust</span> : "Kõik viimased postitused"}</Typography>
                <RadioGroup value={value} onChange={handleChange} row >
                    <FormControlLabel value="" control={<Radio color='primary'/>} label="Kõik" />
                    <FormControlLabel value="eraisik" control={<Radio color='primary'/>} label="Eraisik" />
                    <FormControlLabel value="ettevõte" control={<Radio color='primary'/>} label="Ettevõte" />                    
                </RadioGroup>          
            </div>
        </div>
    )
}

export default Header
