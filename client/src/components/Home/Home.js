import React, { useEffect } from 'react';
import styles from './Home.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { postType } from '../../actions/posts'
import { location } from '../../actions/location';

import { Button, Fab } from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation';


const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const profile  = JSON.parse(localStorage.getItem('profile'));

    const looking = (e) => {
        dispatch(postType('Otsin'))
        history.push('/main')
    }

    const offering = () => {
        dispatch(postType('Pakun'))
        history.push('/main')
    }
    
    const login = () => {
        history.push('/login')
    }

    const register = () => {
        history.push('/register')
    }

    useEffect(() => {
        dispatch(location(history.location.pathname))
        if (profile) {
            history.replace('/main')}
        },[history, dispatch, profile])

        
    
    
    return (
        <div className={styles.homeContainer}>
            <div className={styles.textContainer}>
                <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore ipsa in minima vitae excepturi odio accusantium maxime pariatur rem esse repellat ea similique ut, non accusamus? Possimus voluptatem earum adipisci quo consectetur facere, neque numquam esse sapiente officia? Ea, ex?</h3>
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
