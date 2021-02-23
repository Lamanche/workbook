import React, { useState, useEffect } from 'react'
import styles from './Main.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { postType } from '../../actions/posts'
import CategoryTabs from './CategoryTabs'

import { Paper, Tabs, Tab, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';



const TabBar = () => {
    const dispatch = useDispatch()
    const type = useSelector(state => state.posts.postType)
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const all = () => {
        dispatch(postType())
    }
    
    const looking = (e) => {
        dispatch(postType('Otsin'))
    }

    const offering = (e) => {
        dispatch(postType('Pakun'))
    }

    useEffect(() => {        
        if (!type) {
            setValue(0)
        }
        else if (type === 'Otsin') {
            setValue(1)
        }
        else if (type === 'Pakun') {
            setValue(2)
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
                        <Tab onClick={all} icon={<AllInclusiveIcon/>} label="Kõik" />
                        <Tab onClick={looking} icon={<SearchIcon/>} className={styles.tabsUpper} label="Otsin" />
                        <Tab onClick={offering} icon={<LocalOfferIcon/>} label="Pakun" />
                    </Tabs>                
                </div>
                <Divider />
                <div>
                    <CategoryTabs />
                </div>
            </Paper>    
        </div>
    )
}

export default TabBar