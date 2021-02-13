import { AUTH } from './types.js';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
 try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    router.push('/main');
  } catch (error) {
    console.log(error);
    alert("Wrong Username or Password")
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: AUTH, data });
    router.push('/updateprofile');
  } catch (error) {
    console.log(error);
    alert("user already exists")
  }
};