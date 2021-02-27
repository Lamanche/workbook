import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { location } from '../../actions/location';

import Header from './Header';
import TabBar from './TabBar'
import SideBar from './SideBar';
import Content from './Content'

import styles from './Main.module.css'


const Main = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(location(history.location.pathname))
        },[history, dispatch])

    
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
