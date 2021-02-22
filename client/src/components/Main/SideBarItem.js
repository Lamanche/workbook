import React from 'react';
import styles from './Main.module.css';
import { useDispatch } from 'react-redux';
import { postCategoryType } from '../../actions/posts'

const SideBarItem = ({value, Icon}) => {
    const dispatch = useDispatch();

    const getValue = () => {
        dispatch(postCategoryType(value))
    }    
    
    return (
        <div onClick={getValue} className={styles.sideBarItem}>
            {Icon}
            <p className={styles.sideBarItemText}>{value}</p>
        </div>
    )
}

export default SideBarItem
