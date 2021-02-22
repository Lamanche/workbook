import axios from 'axios';

const API = axios.create({ 
  baseURL: '',
  //Seotud cors'i settinguteda back-endis
  withCredetials: true
});

  
// Auth
export const signIn = (formData) => API.post('/user/signin', formData)
export const register = (formData) => API.post('/user/register', formData)
export const logout = () => API.get('user/logout')

// Posts
export const fetchAllPosts = () => API.get('/post/all');
export const createPost = (formData) => API.post('/post/create', formData)
export const deletePosts = (id) => API.delete(`/post/delete/${id}`)
export const findUserPosts = (email) => API.get('/post/userposts', email)
export const findPostsByWord = (word) => API.get('/post/find', word)
export const findPosts = (key) => API.get(`/post/findposts`, key)

// User profiles
export const fetchUserProfile = (email) => API.post('/user/find', email);
//export const fetchMyProfile = (id) => API.get(`user/user/${id}`)
export const updateMyProfile = (id, formData) => API.patch(`user/update/${id}`, formData)

// Comments
export const postComment = (comment) => API.post('/comments/post', comment)
export const fetchComments = (email) => API.get('/comments/find', email)
export const deleteComment = (id) => API.delete(`/comments/delete/${id}`)