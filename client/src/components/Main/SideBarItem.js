import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postCategoryType } from '../../actions/posts';

import { Paper } from '@material-ui/core'

const SideBarItem = ({ value, Icon }) => {
    const dispatch = useDispatch();
    const categoryType = useSelector(state => state.posts.postCategoryType);

    const [active, setActive] = useState(styles.sideBarItem);
    
    useEffect(() => {
        if (value === categoryType ) {
            setActive(styles.sideBarItemActive);
        } else {
            setActive(styles.sideBarItem);
        };
    },[categoryType, value]);
    

    const getValue = () => {
        dispatch(postCategoryType(value));
    }; 
    
    return (
        <div onClick={getValue}>
            <Paper className={active}>
                {Icon}
                <p className={styles.sideBarItemText}>{value}</p>
            </Paper>
            
        </div>
    )
}

export default SideBarItem
