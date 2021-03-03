import * as actionType from '../actions/types';

const initialState = { post: null }

const postDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_POSTDATA:            
            return { ...state, post: action.payload } 
        case actionType.CLEAR_POSTDATA:            
            return { ...state, post: null }        
        default:
            return state;
    }
}

export default postDataReducer;