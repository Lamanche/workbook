import axios from 'axios';

const API = axios.create({ 
  baseURL: '',
  //Seotud cors'i settingutega back-endis
  withCredetials: true
});

  
// Auth
export const isLoggedIn = () => API.post('/user/loggedin');
export const signIn = (formData) => API.post('/user/signin', formData);
export const googleSignIn = (code) => API.post('/user/googlesignin', code);
export const register = (formData) => API.post('/user/register', formData);
export const logout = () => API.get('user/logout');

// Posts
export const fetchAllPosts = () => API.get('/post/all');
export const createPost = (formData) => API.post('/post/create', formData);
export const updatePost = (id, formData) => API.patch(`/post/update/${id}`, formData);
export const deletePosts = (id) => API.delete(`/post/delete/${id}`);
export const findUserPosts = (userId) => API.get('/post/userposts', userId);
export const findPostsByWord = (word) => API.get('/post/find', word);
export const findPosts = (key) => API.get(`/post/findposts`, key);

// User profiles
export const fetchUserProfile = (userId) => API.post('/user/find', userId);
export const updateMyProfile = (id, formData) => API.patch(`/user/update/${id}`, formData);

// Comments
export const postComment = (comment) => API.post('/comments/post', comment);
export const fetchComments = (userId) => API.get('/comments/find', userId);
export const deleteComment = (id) => API.delete(`/comments/delete/${id}`);

// Messages
export const postMessage = (message) => API.post('', message);

// Offers
export const postOffer = (offer) => API.post('', offer);