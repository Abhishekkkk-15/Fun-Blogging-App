import axios from 'axios';

// Set the base URL for the API
axios.defaults.baseURL = 'http://localhost:8000/fun-blog'; 

export const getBlogs = (page,limit) => axios.get(
    "/all-blogs",
    { params: { page: page, limit: limit } }
  );
export const getBlog = (userId) => axios.get(
    `/blog/${userId}`,
  );
export const addNewPost = (data) => axios.post(
    `/create-blog`
  ,data,{ withCredentials: true });


export const addLike = (blogId) => axios.post(`/blog/${blogId}/like`, {}, { withCredentials: true });

export const removeLike = (blogId) => axios.delete(`/blog/${blogId}/unlike`, { withCredentials: true });

export const getLikes = (blogId) => axios.get(`/blog/${blogId}/likes`);

export const addComment = (blogId, content) => axios.post(`/blog/${blogId}/comment`, { content },{ withCredentials: true });

export const login = (userId,password) => axios.post('/login',{userId,password},{
  withCredentials: true,
})
export const logout = () => axios.post('/logout',{},{
  withCredentials: true,
})

export const getUserInfo = () => axios.post('/userinfo',{},{withCredentials:true})