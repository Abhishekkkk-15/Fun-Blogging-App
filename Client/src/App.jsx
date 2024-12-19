import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
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
import { useDispatch,useSelector } from 'react-redux';
import { getUserInfo} from './services/api';
import { setLoggedIn, setUser } from './app/Slices/userSlice';
import Messaging from './components/message/Messaging';


function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userData)
  useEffect(() => {
    const fetchUserInfo = async () => {
     
        try {
          const response = await getUserInfo();
          const userInfo = response.data.newInfo;
          dispatch(setUser(userInfo));
          dispatch(setLoggedIn(true));
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      
    };
    fetchUserInfo();
  }, []);
  return (
    <div className="bg-[#fefefe] min-h-screen">
       <Router>
      <Routes>
        <Route path="/hero" element={<WelcomeScreen/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:identifier" element={<DetailsScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/search" element={<DiscoverScreen />} />
        <Route path="/profile/:identifier" element={<ProfileComponent />} />
        <Route path="/userProfile" element={user ? <UserProfile /> : <Login />} />
        <Route path="/add-blog" element={<AddPost />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/forget-passwrod" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/message" element={<Messaging />} />
      </Routes>
      <BottomNavbar/>
    </Router>
    </div>
  );
}

export default App;

