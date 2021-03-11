import React, { useEffect } from 'react';
import styles from './Home.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postType } from '../../actions/posts';
import { location } from '../../actions/location';

import { Button, Fab } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';


const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.isLoggedIn);

    const looking = () => {
        dispatch(postType('Otsin'));
        history.push('/main');
    };

    const offering = () => {
        dispatch(postType('Pakun'));
        history.push('/main');
    };
    
    const login = () => {
        history.push('/login');
    };

    const register = () => {
        history.push('/register');
    };

    useEffect(() => {
        dispatch(location(history.location.pathname));
        if (loggedIn === true) {
            history.replace('/main')
        };
        },[dispatch, history, loggedIn]);   
    
    return (
        <div className={styles.homeContainer}>
            <div className={styles.textContainer}>
                <h3>Otsid või pakud teenust? Vajad, et keegi sind koolitaks või hoopis tahad oma oskusi teistega jagada? Soovid midagi välja rentida? Võid kindel olla, et see on selleks maailma parim koht.</h3>
                <h3>Alusta siit!</h3>
            </div>            
            <div className={styles.choicesContainer}>
                <Fab onClick={looking} className={styles.lookingBtn} variant="extended">
                    <NavigationIcon />
                    Otsin
                </Fab>
                <Fab onClick={offering} className={styles.offeringBtn} variant="extended">
                    <NavigationIcon />
                    Pakun
                </Fab>
            </div>
            <div className={styles.loginContainer}>
                <Button variant='contained' color='primary' onClick={login} >Log In</Button>
                <Button variant='contained' color='primary' onClick={register} >Register</Button>
            </div>
        </div>
    )
}

export default Home
