import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailsScreen from './components/DetailsScreen';
import DiscoverScreen from './components/DiscoverScreen';
import BottomNavbar from './components/BottomNavbar';
import HomePage from './components/HomePage';
import Register from './components/Register';
import ProfileComponent from './components/Profile';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import AddPost from './components/AddPost';
import EditProfile from './components/EditProfile';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './services/api';
import { setLoggedIn, setUser } from './app/Slices/userSlice';
import Messaging from './components/message/Messaging';
// import socketConnect from './app/Slices/socketSlice'; 
import { socket } from './lib/socket.js';
import { setOnlineUsers } from './app/Slices/messageSlice';
import ShowFollowers from './components/ShowFollowers';
import ShowFollowing from './components/ShowFollowing';
import Account from './components/Account';
import ChangePassword from './components/ChangePassword';
import AboutUs from './components/AboutUs';
import ThemeSelector from './components/ThemeSelector.jsx';

function App() {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState('')
  const user = useSelector(state => state.user.userData)
  const theme = useSelector(state => state.user.theme)
  useEffect(() => {
    let isMounted = true; // Track if component is still mounted

    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        if (!isMounted) return; // Prevent state updates if unmounted

        const userInfo = response.data.newInfo;
        setUserId(userInfo._id)
        dispatch(setUser(userInfo));
      } catch (error) {
        console.error("Error fetching user info:", error.response?.data?.message || error.message);
      }
    };

    fetchUserInfo();

    // Cleanup on unmount
    return () => {
      isMounted = false;

      socket.disconnect()
    };
  }, []);

  useEffect(() => {
    if (userId) {
      if (!socket.connected) {
        socket.auth = { userId }; // Use the updated userId state
        socket.connect();
      }
    }
    const handleOnlineUser = (data) => {
      dispatch(setOnlineUsers(data))
      // console.log(data);
    };

    socket.on('onlineUser', handleOnlineUser);


    return () => {
      socket.disconnect()
    };
  }, [userId,dispatch]);

  return (
    <div className="min-h-screen" data-theme={theme}>
      <Router>
        <Routes>  
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:identifier" element={ user?._id ? <DetailsScreen /> : <Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/search" element={ user?._id ?  <DiscoverScreen /> : <Login/>} />
          <Route path="/profile/:identifier" element={ user?._id ? <ProfileComponent />  : <Login/>} />
          <Route path="/userProfile" element={user?._id ? <UserProfile /> : <Login />} />
          <Route path="/account" element={user?._id ? <Account /> : <Login />} />
          <Route path="/add-blog" element={ user?._id ? <AddPost /> : <Login/>} />
          <Route path="/edit-profile" element={ user?._id ? <EditProfile /> : <Login/>} />
          <Route path="/forget-passwrod" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/message" element={ user?._id ? <Messaging /> : <Login/>} />
          <Route path="/followers" element={ user?._id ? <ShowFollowers /> : <Login/>} />
          <Route path="/following" element={ user?._id ? <ShowFollowing /> : <Login/>} />
          <Route path="/change-password" element={ user?._id ? <ChangePassword /> : <Login/>} />
          <Route path="/aboutus" element={ user?._id ? <AboutUs /> : <Login/>} />
          <Route path="/theme" element={ <ThemeSelector />} />
        </Routes>
        <BottomNavbar />
      </Router>
    </div>
  );
}

export default App;

