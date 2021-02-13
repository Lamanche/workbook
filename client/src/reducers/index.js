import { combineReducers } from 'redux';

import profile from './profile';
import auth from './auth';

export const reducers = combineReducers({ auth, profile });