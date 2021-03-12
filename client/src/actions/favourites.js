import { SET_FAVOURITES, CLEAR_FAVOURITES } from './types.js';

export const setFavourites = (e) => {
    return {
        type: SET_FAVOURITES,
        payload: e
    };
};

export const clearFavourites = () => {
    return {
        type: CLEAR_FAVOURITES,
    }
}

