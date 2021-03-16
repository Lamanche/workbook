import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCategory } from '../../actions/posts';
import styles from './Main.module.css';
import { categories } from '../../utils/categories'

import { Tabs, Tab } from '@material-ui/core';

const CategoryTabs = () => {
    const dispatch = useDispatch();    
    const category = useSelector(state => state.posts.postCategory);
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabValue = (e) => {
        console.log(e.target.innerText)
        if (e.target.innerText === "KÕIK") {
            dispatch(postCategory(""));
        } else {
            dispatch(postCategory(e.target.innerText.toLowerCase()));
        };      
    };

    useEffect(() => {
        if (category === "") {
            setValue(0)
        }
        else {
            setValue(categories.indexOf(category));
        }        
    },[category]);

    
    return (
        <Tabs
            className={styles.categoryTabs}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="category tabs"
        >
            {categories.map(item => (
                <Tab key={categories.indexOf(item)} className={styles.categoryTab} onClick={tabValue} label={item}  />
            ))}
        </Tabs>
    )
}

export default CategoryTabs
