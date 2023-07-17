import React from "react";
import { useState, useEffect } from "react";
import "../styles/WhyUs.css";
import "../index.css";


function WhyUs()
{
    
    return(
        <div className="whyus_parent">
                <div className="why_topic_1">
                    <i class="fa-solid fa-map-location-dot"></i>
                    <h4>Diverse Destinations</h4>
                    <p>Discover a world of possibilities with our wide range of handpicked travel destinations.</p>
                </div>
                <div className="why_topic_2">
                    <i class="fa-solid fa-handshake-angle"></i>
                    <h4>Expert Travel Guides</h4>
                    <p>Journey with confidence using our expertly curated travel guides and insider tips.</p>
                </div>
                <div className="why_desc">
                    <h2>Why Choose Us?</h2>
                    <p>Welcome to a travel experience like no other. With personalized service and expertly crafted adventures, we redefine exceptional journeys. With personalized service and expertly crafted adventures, we redefine exceptional journeys. Trust us to make your travel dreams a reality and embrace the extraordinary difference. Discover the world in a whole new way, tailored to your unique preferences. Join us for unforgettable moments that will leave you inspired and amazed.</p>
                    <a href="">
                        Read More
                        <i class="fa-solid fa-arrow-right-long"></i>
                    </a>
                </div>
                <div className="why_topic_3">
                    <i class="fa-solid fa-bed"></i>
                    <h4>Luxurious Comfort</h4>
                    <p>Relish in a haven of tranquility, making your journey truly exceptional.</p>
                </div>
                <div className="why_topic_4">
                    <i class="fa-solid fa-user-shield"></i>
                    <h4>Assured Safety & Security</h4>
                    <p>Travel with peace of mind, knowing we prioritize your safety at every step.</p>
                </div>

                <div className="statistics">
                    <div className="customers">
                        <h1>25K+</h1>
                        <p>Clients</p>
                    </div>
                    <div className="teams">
                        <h1>55+</h1>
                        <p>Teams</p>
                    </div>
                    <div className="destinations">
                        <h1>850+</h1>
                        <p>Destinations</p>
                    </div>
                    <div className="hotels">
                        <h1>4K+</h1>
                        <p>Hotels</p>
                    </div>
                </div>
        </div>
    );
}

export default WhyUs;