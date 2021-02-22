import { combineReducers } from 'redux';

import profile from './profile';
import auth from './auth';
import posts from './posts'
import location from './location';

export const reducers = combineReducers({ auth, profile, posts, location });