import { AUTH, LOGOUT, LOGGED_IN } from './types.js';
import * as api from '../api/index.js';

export const isLoggedIn = () => async (dispatch) => {    
  try {
    //await api.isLoggedIn().then(res => console.log(res.message))
    
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
    localStorage.setItem('profileupdated', JSON.stringify({ updated: true }));
    history.replace('/main');
  } catch (error) {
    alert(error.message)
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
    await api.logout()
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error.message)
  }
  
  
}