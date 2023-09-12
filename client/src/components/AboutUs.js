import React from "react";
import { useState, useEffect } from "react";
import "../styles/AboutUs.css";
import "../index.css";
import Destinations from "../images/whyus_destinations3.webp";
import Clients from "../images/whyus_clients.webp";
import Teams from "../images/whyus_teams.webp";
import Hotels from "../images/whyus_hotels.webp";


function AboutUs()
{
    return(

        <div className="aboutus_parent">
            <div className="aboutus_heading">
                        <h1>About</h1>
                        <h2>us</h2>
                    </div>
            <div className="aboutus_content">
                <div className="aboutus_left">
                    <p>Experience the world like never before with our unforgettable travel adventures. Whether you're seeking the serenity of remote beaches, the excitement of bustling cities, or the tranquility of lush landscapes, our travel packages cater to every wanderlust-filled heart. Join us on a journey of discovery and create lasting memories that will inspire your inner explorer. Start planning your next adventure today!</p>
                    <ul>
                        <li>Destinations</li>
                        <li>Teams</li>
                        <li>Clients</li>
                    </ul>
                </div>
                <div className="aboutus_right">
                    <div>
                        <img src={Teams}/>
                        <img src={Destinations}/>
                    </div>
                    <img src={Clients}/>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;