import { AUTH, LOGOUT, LOGGED_IN, CLEAR_FAVOURITES } from './types.js';
import * as api from '../api/index.js';

export const isLoggedIn = () => async (dispatch) => {    
  try {    
    await api.isLoggedIn().catch(err => {
      if (err.response.status === 401) {
        dispatch({ type: LOGOUT });
      } else {
        //dispatch({ type: LOGGED_IN })
      }
      dispatch({ type: LOGGED_IN })
    });   
  } catch (error) {
    console.log(error)
  }    
};

export const signin = (formData, history) => async (dispatch) => {
 try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    history.replace('/main');
  } catch (error) {
    alert("Vale kasutajanimi või salasõna")
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: AUTH, data });    
    history.replace('/updateprofile');
  } catch (error) {
    alert(error.message)
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_FAVOURITES });
  } catch (error) {
    console.log(error.message)
  }
}

export const tokenExpired = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_FAVOURITES });
}