// src/services/api.js

import axios from 'axios';

// Set the base URL for the API
axios.defaults.baseURL = 'http://localhost:8000';  // Replace with your backend URL

// Example of API calls

// Get all blogs
export const getBlogs = () => axios.get('/fun-blog/all-blogs');

// Add a like to a blog
export const addLike = (blogId) => axios.post(`/blog/${blogId}/like`, {}, { withCredentials: true });

// Remove a like from a blog (unlike)
export const removeLike = (blogId) => axios.delete(`/blog/${blogId}/unlike`, { withCredentials: true });

// Get all likes for a specific blog
export const getLikes = (blogId) => axios.get(`/blog/${blogId}/likes`);

// Add a comment to a blog
export const addComment = (blogId, content) => axios.post(`/fun-blog/addComment/${blogId}`, { content });
