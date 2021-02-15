import { AUTH } from './types.js';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
 try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    localStorage.setItem('profileupdated', JSON.stringify({ updated: true }));
    router.replace('/main');
  } catch (error) {
    console.log(error);
    alert("Wrong Username or Password")
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: AUTH, data });
    router.replace('/updateprofile');
  } catch (error) {
    console.log(error);
    alert("user already exists")
  }
};