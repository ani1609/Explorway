import React from "react";
import { useState, useEffect } from "react";
import '../index.css';
import '../styles/Footer.css';

function Footer()
{
    return(
        <div className="footer_parent">
            <div className="footer_content">
                <div>
                    <h4>Company</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Services</li>
                        <li>Investors</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div>
                    <h4>Support</h4>
                    <ul>
                        <li>FAQs</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <ul>
                        <li>Get started</li>
                        <li>Home</li>
                        <li>About</li>
                        <li>Places</li>
                    </ul>
                </div>
                <div>
                    <h4>Connect with us</h4>
                    <ol>
                        <li><i class="fa-brands fa-facebook"></i></li>
                        <li><i class="fa-brands fa-square-instagram"></i></li>
                        <li><i class="fa-brands fa-twitter"></i></li>
                        <li><i class="fa-brands fa-youtube"></i></li>
                    </ol>
                </div>
            </div>
            <div className="footer_line"></div>
            <div className="footer_below">
                <a href="">© 2023 All Rights Reserved</a>
                <a href="">Prathamik</a>
            </div>
        </div>
    );

}

export default Footer;