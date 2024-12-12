import React from 'react';
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
function App() {
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
        <Route path="/userProfile/:id" element={<UserProfile />} />
        <Route path="/add-blog" element={<AddPost />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/forget-passwrod" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <BottomNavbar/>
    </Router>
    </div>
  );
}

export default App;

