import * as actionType from '../actions/types';

const initialState = { name: '', email: ''}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GETPROFILE:            
            localStorage.setItem('user', JSON.stringify({ name: action.payload.name, email: action.payload.email }))
            return { ...state, name: action.payload.name, email: action.payload.email }
        
        case actionType.CLEARPROFILE:
            localStorage.removeItem('user');
            return { ...state, name: '', email: '' }    
        default:
            return state;
    }
}

export default profileReducer;