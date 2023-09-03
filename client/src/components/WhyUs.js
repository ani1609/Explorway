import React from "react";
import { useState, useEffect } from "react";
import "../styles/WhyUs.css";
import "../index.css";
import Destinations from "../images/whyus_destinations3.webp";
import Clients from "../images/whyus_clients.webp";
import Teams from "../images/whyus_teams.webp";
import Hotels from "../images/whyus_hotels.webp";


function WhyUs()
{
    
    return(
        <div className="whyus_parent">
            <div className="bg_ele3"></div>
            <div className="bg_ele4"></div>

            <div className="why_heading">
                <h1>Why choose</h1>
                <h2>us</h2>
                <h1>?</h1>
            </div>

            <div className="whyus_blocks">
                <div className="whytopic">
                    <i class="fa-solid fa-map-location-dot"></i>
                        <h4>Diverse Destinations</h4>
                    <p>Discover a world of possibilities with our wide range of handpicked travel destinations.</p>
                </div>
                <div className="whytopic">
                    <i class="fa-solid fa-handshake-angle"></i>
                    <h4>Expert Travel Guides</h4>
                    <p>Journey with confidence using our expertly curated travel guides and insider tips.</p>
                </div>
                <div className="whytopic">
                    <i class="fa-solid fa-bed"></i>
                    <h4>Luxurious Comfort</h4>
                    <p>Relish in a heaven of tranquility, making your journey truly exceptional.</p>
                </div>
                <div className="whytopic">
                    <i class="fa-solid fa-user-shield"></i>
                    <h4>Assured Safety & Security</h4>
                    <p>Travel with peace of mind, knowing we prioritize your safety at every step.</p>
                </div>
            </div>
        </div>
    );
}

export default WhyUs;