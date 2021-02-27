import * as actionType from '../actions/types';

const updateReducer = (state = 0, action) => {
    switch (action.type) {
        case actionType.UPDATE:            
            return state + action.payload        
        default:
            return state;
    }
}

export default updateReducer;