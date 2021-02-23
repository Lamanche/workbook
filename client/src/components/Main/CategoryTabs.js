import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCategory } from '../../actions/posts'

import { Tabs, Tab } from '@material-ui/core';

const CategoryTabs = () => {
    const dispatch = useDispatch()
    //const type = useSelector(state => state.posts.postType)
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabValue = (e) => {
        //console.log(e.target.innerText.toLowerCase())
        dispatch(postCategory(e.target.innerText.toLowerCase()))
    }
    
    return (
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="category tabs"
        >
            <Tab onClick={tabValue} label="Kõik"  />
            <Tab onClick={tabValue} label="Engineering"  />
            <Tab onClick={tabValue} label="Coding"  />
            <Tab onClick={tabValue} label="Design"  />
            <Tab onClick={tabValue} label="Construction"  />
            <Tab label="Item Five"  />
            <Tab label="Item Six"  />
            <Tab label="Item Seven"  />
            <Tab label="Item Four"  />
            <Tab label="Item Five"  />
            <Tab label="Item Six"  />
            <Tab label="Item Seven"  />
        </Tabs>
    )
}

export default CategoryTabs
