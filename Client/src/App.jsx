import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import DetailsScreen from './components/DetailsScreen';
import DiscoverScreen from './components/DiscoverScreen';
import BottomNavbar from './components/BottomNavbar';
import HomePage from './components/HomePage';
import AutoForm from './components/AutoForm';
import RegisterScreen from './components/RegisterScreen';
import ProfileComponent from './components/Profile';
import Login from './components/Login';
import Signup from './components/AutoForm';
import UserProfile from './components/UserProfile';
import AddPost from './components/AddPost';
function App() {
  return (
    <div className="bg-[#fefefe] min-h-screen">
      {/* <WelcomeScreen/> */}
       <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<DetailsScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Signup />} />
        <Route path="/search" element={<DiscoverScreen />} />
        <Route path="/profile" element={<ProfileComponent />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/add-blog" element={<AddPost />} />
      </Routes>
      <BottomNavbar/>
    </Router>
    </div>
  );
}

export default App;

