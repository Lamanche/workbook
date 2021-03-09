import React, { useEffect, useState } from 'react';
import Card from '../Posts/Card';
import styles from './Favourites.module.css';

import { Grid } from '@material-ui/core';

const Favourites = () => {
    const [loading, setLoading] = useState(false);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        setLoading(true)
        //Tõmba andmebaasist kõik lemmikuks märgitud postitused
        setFavourites();
        setLoading(false)
    },[]);

    return (
        <div className={styles.favouritesContainer}>
            <Grid container>
                {favourites.map(favourite => 
                    (<Grid key={favourite._id}item>
                        <Card data={favourite}/>
                    </Grid>)
                )}
            </Grid>
            Tere lemmikud
        </div>
    )
}

export default Favourites
