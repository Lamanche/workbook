import React, { useEffect } from 'react';
import styles from './Main.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { location } from '../../actions/location';
import { clearPostData } from '../../actions/postData.js';
import SideBarSmall from './SideBarSmall';

import { Paper } from '@material-ui/core'

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
        <div className={styles.mainMainContainer}>
            <TabBar />
            <div className={styles.mainContainer}>
                <div className={styles.sideBarSmall}>
                    <Paper className={styles.sideBarSmallPaper} square >
                        <SideBarSmall />
                    </Paper>                
                </div> 
                <div className={styles.container}>            
                    <Header />
                    <div className={styles.contentContainer}>                    
                        <Content />
                        <div className={styles.sideBarBig}>
                            <SideBar />
                        </div>                    
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default Main
