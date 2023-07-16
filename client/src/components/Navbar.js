import React, { useRef, useEffect, useState } from "react";
import "../styles/Navbar.css";
import "../index.css";
import Logo from "../images/logo1.png";

function Navbar()
{
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(true);

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

  const handleSignupMouseEnter = () =>
  {
    // setSignup(true);
  };

  const handleSignupMouseLeave = () =>
  {
    // setSignup(false);
  };

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
            <button onMouseEnter={handleLoginMouseEnter} onMouseLeave={handleLoginMouseLeave} className={login ? navbarScrolled ? "login_button login_entered white" : "login_button login_entered white" : navbarScrolled ? "login_button login_left color" : "login_button login_left white"}>Login</button>
            <button onMouseEnter={handleSignupMouseEnter} onMouseLeave={handleSignupMouseLeave} className={signup ? "signup_button signup_entered" : "signup_button signup_left"}>Sign Up</button>
          </li>
        </ul>
        
    </div>
  );
};

export default Navbar;