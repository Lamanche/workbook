import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCategory } from '../../actions/posts';
import styles from './Main.module.css';

import { Tabs, Tab } from '@material-ui/core';

const CategoryTabs = () => {
    const dispatch = useDispatch();    
    const category = useSelector(state => state.posts.postCategory);

    const cats = ['', 'engineering', 'coding', 'design', 'construction'];
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabValue = (e) => {
        if (e.target.innerText === 'KÕIK') {
            dispatch(postCategory(''));
        } else {
            dispatch(postCategory(e.target.innerText.toLowerCase()));
        };      
    };

    useEffect(() => {
        setValue(cats.indexOf(category));
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
            <Tab className={styles.categoryTab} onClick={tabValue} label="Kõik"  />
            <Tab className={styles.categoryTab} onClick={tabValue} label="Engineering"  />
            <Tab className={styles.categoryTab} onClick={tabValue} label="Coding"  />
            <Tab className={styles.categoryTab} onClick={tabValue} label="Design"  />
            <Tab className={styles.categoryTab} onClick={tabValue} label="Construction"  />
            <Tab className={styles.categoryTab} label="Item Five"  />
            <Tab className={styles.categoryTab} label="Item Six"  />
            <Tab className={styles.categoryTab} label="Item Seven"  />
            <Tab className={styles.categoryTab} label="Item Four"  />
            <Tab className={styles.categoryTab} label="Item Five"  />
            <Tab className={styles.categoryTab} label="Item Six"  />
            <Tab className={styles.categoryTab} label="Item Seven"  />
        </Tabs>
    )
}

export default CategoryTabs
