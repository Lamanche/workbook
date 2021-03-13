import React, { useEffect } from 'react';
import styles from './Main.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { location } from '../../actions/location';
import { clearPostData } from '../../actions/postData.js';

import Header from './Header';
import TabBar from './TabBar';
import SideBar from './SideBar';
import Content from './Content';


const Main = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(location(history.location.pathname));
        dispatch(clearPostData())
    },[history, dispatch]);    
    
    return (
        <>
            <TabBar />
            <div className={styles.container}>            
                <Header />
                <div className={styles.contentContainer}>                    
                    <Content />
                    <SideBar />
                </div>
            </div>
        </>        
    )
}

export default Main
