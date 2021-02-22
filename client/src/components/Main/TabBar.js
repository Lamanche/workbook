import React, { useState, useEffect } from 'react'
import styles from './Main.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { postType } from '../../actions/posts'

import { Paper, Tabs, Tab, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';



const TabBar = () => {
    const dispatch = useDispatch()
    const type = useSelector(state => state.posts.postType)
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const looking = (e) => {
        dispatch(postType('Otsin'))
    }

    const offering = (e) => {
        dispatch(postType('Pakun'))
    }

    useEffect(() => {        
        if (!type) {
            setValue(null)
        }
        else if (type === 'Otsin') {
            setValue(0)
        }
        else if (type === 'Pakun') {
            setValue(1)
        }
    },[type])
    
    return (
        <div>
            <Paper square>   
                <div className={styles.tabsUpper}>                
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab onClick={looking} icon={<SearchIcon/>} className={styles.tabsUpper} label="Otsin" />
                        <Tab onClick={offering} icon={<LocalOfferIcon/>} label="Pakun" />
                    </Tabs>                
                </div>
                <Divider />
                <div>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="category tabs"
                        >
                        <Tab label="Item Oneqwdqwdqedqew"  />
                        <Tab label="Item Two"  />
                        <Tab label="Item Three"  />
                        <Tab label="Item Four"  />
                        <Tab label="Item Five"  />
                        <Tab label="Item Six"  />
                        <Tab label="Item Seven"  />
                        <Tab label="Item Four"  />
                        <Tab label="Item Five"  />
                        <Tab label="Item Six"  />
                        <Tab label="Item Seven"  />
                    </Tabs>
                </div>
            </Paper>    
        </div>
    )
}

export default TabBar
