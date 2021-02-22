import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { location } from '../../actions/location';
import decode from 'jwt-decode';
import { LOGOUT } from '../../actions/types';

import Header from './Header';
import TabBar from './TabBar'
import SideBar from './SideBar';
import Content from './Content'

import styles from './Main.module.css'


const Main = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile')); 

    const logout = () => {
        dispatch({ type: LOGOUT });
        history.replace("/");   
      };

    useEffect(() => {
        dispatch(location(history.location.pathname))
        },[history, dispatch])

    
    useEffect(() => {
        const token = user?.token;        
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    },[])
    
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
