import React, { useRef, useEffect, useState } from "react";
import "../styles/Navbar.css";
import "../index.css";
import Logo from "../images/logo1.png";
import axios from "axios";

function Navbar()
{
  const user = JSON.parse(localStorage.getItem('user'));
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [passwordUnmatched, setPasswordUnmatched] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });

  const decodeToken = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken;
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try
    {
      const response = await axios.post("http://localhost:3000/api/users/login", loginData);
      // console.log("user ",response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log("user in local storage",user);
      console.log("user in local storage",user.data.name);
      console.log("user in local storage",user.data.email);
      setInvalidEmail(false);
    } catch (error) 
    {
      if (error.response.status === 401)
      {
        setInvalidEmail(true);
        console.error(error.response.data.message);
        return;
      }
      console.error(error.response.data.message);
    }
  };

  const handleSignupSubmit = async (e) => 
  {
    e.preventDefault();
    if (signupData.password !== signupData.c_password)
    {
      setPasswordUnmatched(true);
      console.log("Passwords do not match");
      return;
    }
    try 
    {
      const response = await axios.post("http://localhost:3000/api/users/signup", signupData);
      setUserExists(false);
      // console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log("user in local storageeee",user);
      console.log("user in local storageeeee",user.data.name);
      console.log("user in local storageeee",user.data.email);
    } catch (error) 
    {
      if (error.response.status === 409)
      {
        setUserExists(true);
        console.error(error.response.data.message);
        return;
      }
      console.error(error.response.data.message);
    }
  };

  useEffect(() => 
  {
    const transparentNav = () =>
    {
      if (window.scrollY > 50) 
      {
        setNavbarScrolled(true);
      } 
      else 
      {
        setNavbarScrolled(false);
      }
    }
    window.addEventListener("scroll", transparentNav);
    return () => {
      window.removeEventListener("scroll", transparentNav);
    }
  }, []);

  const handleLoginMouseEnter = () =>
  {
    setSignup(false);
    setLogin(true);
  };

  const handleLoginMouseLeave = () =>
  {
    setLogin(false);
    setSignup(true);
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const toggleBodyScroll = (scrollable) => {
      document.body.style.overflow = scrollable ? "auto" : "hidden";
    };

    if (showLoginForm || showSignupForm) {
      toggleBodyScroll(false);
    } else {
      toggleBodyScroll(true);
    }

  }, [showLoginForm, showSignupForm]);
  

  return (
    <div className={navbarScrolled?"navbar_parent opaque":"navbar_parent transparent"}>
        <a href="" className="logo_container">
          <img src={Logo} alt="logo" className="logo"/>
          <p className={navbarScrolled ? "color":"color"}>Trekwise</p>
        </a>
        <ul>
          <li className={navbarScrolled ? "color":"white"}>Home</li>
          <li className={navbarScrolled ? "color":"white"}>Places</li>
          <li className={navbarScrolled ? "color":"white"}>Hotels</li>
          <li className={navbarScrolled ? "color":"white"}>About Us</li>
          <li className={navbarScrolled ? "color":"white"}>Contact</li>
          <li className="login_signup_container">
            <button
              onClick={() => setShowLoginForm(true)}
              onMouseEnter={handleLoginMouseEnter}
              onMouseLeave={handleLoginMouseLeave}
              className={login ? navbarScrolled ? "login_button login_entered white" : "login_button login_entered white" : navbarScrolled ? "login_button login_left color" : "login_button login_left white"}
            >
              Login
            </button>
            <button
              onClick={() => setShowSignupForm(true)}
              className={signup ? "signup_button signup_entered" : "signup_button signup_left"}
              >Sign Up
            </button>
          </li>
        </ul>

        {showLoginForm || showSignupForm ? (<div className="login_form_container" onClick={() => {setShowLoginForm(false);setShowSignupForm(false)}}>
          {showLoginForm && <div className="login_form" onClick={handleFormClick}>
            <a href="" className="logo_container_form">
              <img src={Logo} alt="logo"/>
              <p>Trekwise</p>
            </a>
            <h1>Welcome Back</h1>
            <form onSubmit={handleLoginSubmit}>
              <input 
                type="email" 
                placeholder="Email" 
                className="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
              <p>
                Don't have an acoount?&nbsp;
                <a href="" 
                onClick={(e) => {e.preventDefault(); setShowSignupForm(true);setShowLoginForm(false)}}
                >
                  Get one
                </a>
              </p>
              <button className="form_login_button">Login</button>
            </form>
          </div>}
          {showSignupForm && <div className="signup_form" onClick={handleFormClick}>
            <a href="" className="logo_container_form">
              <img src={Logo} alt="logo"/>
              <p>Trekwise</p>
            </a>
            <h1>Join Us</h1>
            <form onSubmit={handleSignupSubmit}>
              <input 
                type="text" 
                placeholder="Name" 
                className="name"
                value={signupData.name}
                onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                required
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="email"
                value={signupData.email}
                onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="password"
                value={signupData.password}
                onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                required
              />
              <input 
                type="password" 
                placeholder="Confirm Password" 
                className="c_password"
                value={signupData.c_password}
                onChange={(e) => setSignupData({...signupData, c_password: e.target.value})}
                required
              />
              <p>
                Already have an account?&nbsp;
                <a href="" 
                  onClick={(e) => {e.preventDefault(); setShowSignupForm(false);setShowLoginForm(true)}}
                >
                  Log in
                </a></p>
              <button className="form_login_button">Sign Up</button>
            </form>
          </div>}
        </div>):null}

        
    </div>
  );
};

export default Navbar;