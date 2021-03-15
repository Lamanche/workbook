import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourites, deleteFavourite } from '../../api/index';
import { tokenExpired } from '../../actions/auth.js';
import { setFavourites } from '../../actions/favourites.js';
import { update } from '../../actions/update.js';

import { Tooltip, CircularProgress } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DoneIcon from '@material-ui/icons/Done';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Fav = ({ userId, currentPostId, style }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [favouriteSuccess, setFavouriteSuccess] = useState(false);
    const favourites = useSelector(state => state.favourites.favourites)
    
    const addToFav = () => {
        setLoading(true)
        addToFavourites({userId, currentPostId})
          .then(res => {
            if (res.status === 200 || res.status === 201) {
                dispatch(setFavourites(res.data.result.favourites))
                setLoading(false)
                setFavouriteSuccess(true)
                setTimeout(() => {
                setFavouriteSuccess(false)
            }, 1000)
            }
          })
          .catch(error => {
            if (error.response.status === 304) {
                setLoading(false)
                setFavouriteSuccess(true)
                setTimeout(() => {
                    setFavouriteSuccess(false)
                }, 1000)
            }
            else if (error.response.status === 401) {
              setLoading(false)  
              dispatch(tokenExpired());
            }
        });   
      };

      const deleteFav = () => {
        setLoading(true)
        deleteFavourite({userId, currentPostId})
            .then(res => {
                dispatch(setFavourites(res.data.result.favourites))
                dispatch(update(1))
                setLoading(false)
                setFavouriteSuccess(true)
                setTimeout(() => {
                setFavouriteSuccess(false)
            }, 1000)
            })
            .catch(error => {
                /* Catch error? */
            });  
      }
    
    return (
        <div className={style}>
            {loading ? 
                <CircularProgress size='1.2rem'/>
                :
                (favouriteSuccess ? 
                    <DoneIcon />
                    :
                    // Siia kas on juba lisatud v mitte
                    (favourites.indexOf(currentPostId) === -1 ? 
                        <Tooltip title="Lisa lemmikutesse">
                            <FavoriteBorderIcon onClick={addToFav} />
                        </Tooltip>
                        :
                        <Tooltip title="Eemalda lemmikutest">
                            <FavoriteIcon color='primary' onClick={deleteFav} />
                        </Tooltip>
                    )
                )
            }
        </div>
    )
}

export default Fav
