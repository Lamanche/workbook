import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Card from '../Posts/Card';
import styles from './Favourites.module.css';
import { fetchFavourites } from '../../api/index.js';
import { tokenExpired } from '../../actions/auth.js';

import { Grid } from '@material-ui/core';


const Favourites = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.authData.result._id);
    const [loading, setLoading] = useState(false);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchFavourites({params: { id: userId }})
            .then(res => {
                setFavourites(res.data.posts);
                setLoading(false);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                    setLoading(false);
                }
            });        
    },[userId, dispatch]);

    return (
        <div className={styles.favouritesContainer}>
            {loading === false ? 
                <Grid container spacing={1}>
                    {favourites.map(favourite => 
                        (<Grid key={favourite._id} item>
                            <Card data={favourite}/>
                        </Grid>)
                    )}
                </Grid>
                :
                <p>Loading...</p>
            }
        </div>
    )
}

export default Favourites
