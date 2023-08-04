import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/App.css';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Header from './Header';
import WhyUs from './WhyUs';
import Card from './Card';
import Subscription from './Subscription';
import Profile from './Profile.js';
import Footer from './Footer';


import '@fortawesome/fontawesome-free/css/all.min.css';

function App() 
{
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() 
{
  return (
    <div>
      <Navbar/>
      <Header />
      <WhyUs />
      <Card />
      <Subscription />
      <Footer />
    </div>
  );
}

function ProfilePage() 
{
  return (
    <div>
      <Navbar/>
      <Profile />
      <Footer />
    </div>
  );
}


export default App;
