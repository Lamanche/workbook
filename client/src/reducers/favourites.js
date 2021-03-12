import * as actionType from '../actions/types';

const initialState = { favourites: [] }

const favouritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_FAVOURITES:            
            return { ...state, favourites: action.payload }        
        case actionType.CLEAR_FAVOURITES:            
            return { ...state, favourites: [] }
        default:
            return state;
    }
}

export default favouritesReducer;