import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import DetailsScreen from './components/DetailsScreen';
import DiscoverScreen from './components/DiscoverScreen';
import BottomNavbar from './components/BottomNavbar';
import HomePage from './components/HomePage';
function App() {
  return (
    <div className="bg-[#fefefe] min-h-screen">
      {/* <WelcomeScreen/> */}
      {/* <DiscoverScreen/> */}
       <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<DetailsScreen />} />
      </Routes>
      <BottomNavbar/>
    </Router>
    </div>
  );
}

export default App;

