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
          <Route path="/profile/myProfile" element={<MyProfilePage />} />
          <Route path="/profile/address" element={<Address />} />
          <Route path="/profile/wishlist" element={<Wishlist />} />
          <Route path="/profile/changePassword" element={<ChangePassword />} />
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

function MyProfilePage() 
{
  return (
    <div>
      <Navbar
        shadow={true}
      />
      <Profile 
        showMyProfile={true}
        showAddress={false}
        showWishlist={false}
        showChangePassword={false}
      />
      <Footer />
    </div>
  );
}

function Address() 
{
  return (
    <div>
      <Navbar
        shadow={true}
      />
      <Profile 
        showMyProfile={false}
        showAddress={true}
        showWishlist={false}
        showChangePassword={false}
      />
      <Footer />
    </div>
  );
}


function Wishlist() 
{
  return (
    <div>
      <Navbar
        shadow={true}
      />
      <Profile 
        showMyProfile={false}
        showAddress={false}
        showWishlist={true}
        showChangePassword={false}
      />
      <Footer />
    </div>
  );
}


function ChangePassword() 
{
  return (
    <div>
      <Navbar
        shadow={true}
      />
      <Profile 
        showMyProfile={false}
        showAddress={false}
        showWishlist={false}
        showChangePassword={true}
      />
      <Footer />
    </div>
  );
}



export default App;
