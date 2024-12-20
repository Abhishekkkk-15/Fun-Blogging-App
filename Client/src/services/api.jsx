import axios from 'axios';

// Set the base URL for the API
axios.defaults.baseURL = 'http://localhost:8000/fun-blog'; 

export const getBlogs = (page,limit) => axios.get(
    "/all-blogs",
    { params: { page: page, limit: limit } }
  );
export const getBlog = (identifier) => axios.get(
    `/blog/${identifier}`,
  );
export const addNewPost = (data) => axios.post(
    `/create-blog`
  ,data,{ withCredentials: true });
  
  export const deletePost = (blogId) => axios.post(
      `/blog/delete`
    ,{blogId},{ withCredentials: true });


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
export const signup = (formData) => axios.post('/register',formData,{
  withCredentials: true,
})


export const getUserInfo = () => axios.post('/userinfo',{},{withCredentials:true})
export const getProfile = (identifier) => axios.post('/profile',{identifier},{withCredentials:true})
export const updateUserProfile = (updatedData) => axios.put('/profile/update',updatedData,{withCredentials:true})

export const follow = (toFollow) => axios.put('/follow',{toFollow},{withCredentials:true})

export const unFollow = (toUnfollow) => axios.put('/unFollow',{toUnfollow},{withCredentials:true})

export const getNotifications = () => axios.get('/notification',{
  withCredentials:true
})

export const markAllAsRead = () => axios.post('/notification/markAllAsRead',{},{withCredentials:true})

export const search = (query,type) => axios.get('/search/',{params:{
  query:query,
  type:type
}})


export const requestPasswordReset = (email) => axios.post('/reset-email',{email},{withCredentials:true})
export const resetPassword = (token,newPassword) => axios.post('/reset-password',{token,newPassword},{withCredentials:true})

export const sideBarUsers = () => axios.get("/sidebar-user",{
  withCredentials:true
})

export const getMessages = (userToChatId) => axios.get(`/getMessages/${userToChatId}`,{
  withCredentials:true
})
export const sendMessage = (text,image,receiverId) => axios.post(`/sendMessage/${receiverId}`,{text,image},{
  withCredentials:true
})  
export const getUnreadMessages = (userToChatId) => axios.get(`/getUnreadMessages/${userToChatId}`,  {
  withCredentials:true
})  