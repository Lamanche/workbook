import * as actionType from '../actions/types';

const initialState = { location: '' }

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOCATION:            
            return { ...state, location: action.payload }        
        default:
            return state;
    }
}

export default locationReducer;