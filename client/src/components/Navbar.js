import React, { useRef, useEffect, useState } from "react";
import "../styles/Navbar.css";
import "../index.css";
import Logo from "../images/logo1.png";

function Navbar()
{
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

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
    // Function to toggle the body's scrollability
    const toggleBodyScroll = (scrollable) => {
      document.body.style.overflow = scrollable ? "auto" : "hidden";
    };

    // ... (existing useEffect code)

    // Call the function to disable scrolling when either form is visible
    if (showLoginForm || showSignupForm) {
      toggleBodyScroll(false);
    } else {
      toggleBodyScroll(true);
    }

    // ... (existing useEffect code)

  }, [showLoginForm, showSignupForm]);
  

  return (
    <div className={navbarScrolled?"navbar_parent opaque":"navbar_parent transparent"}>
        <a href="" className="logo_container">
          <img src={Logo} alt="logo" className="logo"/>
          <p className={navbarScrolled ? "color":"white"}>Trekwise</p>
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
            <h1>Welcome Back</h1>
            <form>
              <input type="text" placeholder="Email" className="email"/>
              <input type="password" placeholder="Password" className="password"/>
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
            <h1>Join Us</h1>
            <form>
              <input type="text" placeholder="Name" className="name"/>
              <input type="text" placeholder="Email" className="email"/>
              <input type="password" placeholder="Password" className="password"/>
              <input type="password" placeholder="Confirm Password" className="c_password"/>
              <input type="password" placeholder="Password" className="password"/>
              <p>
                Already have an account?&nbsp;
                <a href="" 
                  onClick={(e) => {e.preventDefault(); setShowSignupForm(false);setShowLoginForm(true)}}
                >
                  Log in
                </a></p>
              <button className="form_login_button">Login</button>
            </form>
          </div>}
        </div>):null}

        
    </div>
  );
};

export default Navbar;