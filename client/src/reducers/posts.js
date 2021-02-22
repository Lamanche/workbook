import * as actionType from '../actions/types';

const initialState = { postType: '', postCategory: '', postUserType: '', postCategoryType: '', loading: false}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.POST_TYPE:                      
            return {
                ...state, postType: action.payload
            }
        case actionType.POST_CATEGORY:                      
            return {
                ...state, postCategory: action.payload
            }
        case actionType.POST_USER_TYPE:                      
            return {
                ...state, postUserType: action.payload
            }
        case actionType.POST_CATEGORY_TYPE:                      
            return {
                ...state, postCategoryType: action.payload
            }
        case actionType.LOADING:                      
            return {
                ...state, loading: true
            }   
        case actionType.FINISHED_LOADING:                      
            return {
                ...state, loading: false
            }      
        default:
            return state;
    }
}

export default postsReducer