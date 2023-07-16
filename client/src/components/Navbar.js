import React, { useRef, useEffect, useState } from "react";
import "../styles/Navbar.css";
import "../index.css";
import Logo from "../images/logo1.png";

function Navbar()
{
  const [navbarScrolled, setNavbarScrolled] = useState(false);

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

  return (
    <div className={navbarScrolled?"navbar_parent opaque":"navbar_parent transparent"}>
        <a href="" className={navbarScrolled ? "logo_container color":"logo_container white"}>
          <img src={Logo} alt="logo" className="logo"/>
          <p>Trekwise</p>
        </a>
        <ul className={navbarScrolled ? "color":"white"}>
          <li>Home</li>
          <li>Places</li>
          <li>Hotels</li>
          <li>About Us</li>
          <li>Contact</li>
          <li className="login_signup_container">
            <button className={navbarScrolled ? "login_button color":"login_button white"}>Login</button>
            <button className="signup_button">Sign Up</button>
          </li>
        </ul>
        
    </div>
  );
};

export default Navbar;
