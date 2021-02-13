import * as actionType from '../actions/types';

let initialState = { isLoggedIn: false, authData: null }

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));      
      return { ...state, isLoggedIn: true, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, isLoggedIn: false, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;