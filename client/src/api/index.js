import axios from 'axios';

const API = axios.create({ baseURL: ''});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }  
    return req;
  });
  
// Auth
export const signIn = (formData) => API.post('/user/signin', formData)
export const register = (formData) => API.post('/user/register', formData)

// Posts
export const fetchAllPosts = () => API.get('/post/all');
export const createPost = (formData) => API.post('/post/create', formData)
export const deletePosts = (id) => API.delete(`/post/delete/${id}`)
export const findUserPosts = (name) => API.get('/post/userposts', name)
export const findPostsByWord = (word) => API.get('/post/find', word)

// User profiles
export const fetchUserProfile = (name) => API.post('/user/find', name);
//export const fetchMyProfile = (id) => API.get(`user/user/${id}`)
export const updateMyProfile = (id, formData) => API.patch(`user/update/${id}`, formData)

// Comments
export const postComment = (comment) => API.post('/comments/post', comment)
export const fetchComments = (email) => API.get('/comments/find', email)
export const deleteComment = (id) => API.delete(`/comments/delete/${id}`)