import React, { useRef, useEffect, useState } from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/Hero.css";
import "../index.css";
import {ReactComponent as Forward} from '../icons/forward.svg';
import {ReactComponent as Backward} from '../icons/backward.svg';
import v1 from "../videos/t2.mp4";
import v2 from "../videos/t11_c.mp4";
import v3 from "../videos/t5.mp4";
import v4 from "../videos/t9.mp4";
import v5 from "../videos/t7.mp4";

const Hero = () => {
  const slideRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [videoIndex, setVideoIndex] = useState(1);

  useEffect(() => {
    const handleScroll = () =>
    {

      const items = slideRef.current.querySelectorAll(".item");
      items.forEach((item, index) => 
      {
        const videoElements = item.querySelectorAll("video");
        if (index === 1) 
        {
          const yOffset = window.scrollY * 0.5; 
          videoElements.forEach((video) => {
            video.style.transform = `translateY(${yOffset}px)`;
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const items = slideRef.current.querySelectorAll(".item");
    items.forEach((item, index) => 
    {
        const videoElements = item.querySelectorAll("video");
        if (index === 1) {
            videoElements.forEach((video) => video.play());
        }
        else 
        {
            videoElements.forEach((video) => video.pause());
        }
    });

  }, [videoIndex]);

  const handleClickNext = () => 
  {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(items[0]);
    if (videoIndex>3) 
    {
        setVideoIndex(0);
    }
    else
    {
        setVideoIndex(videoIndex + 1);
    }
  };

  const handleClickPrev = () => 
  {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
    if (videoIndex<1) 
    {
        setVideoIndex(4);
    }
    else
    {
        setVideoIndex(videoIndex - 1);
    }
  };


  const data = [
    {
      id: 1,
      videoUrl: v1,
      desc: "Indulge in Ultimate Luxury and Unforgettable Experiences: Discover a Haven of Tranquility at Our Exquisite Resorts. Unwind in Serene Ambiance, Savor World-Class Amenities, and Create Memories that Last a Lifetime.",
      name: "Retreat to Paradise: Experience Pure Bliss at Our Exclusive Resorts!",
      url:"",
    },
    {
      id: 2,
      videoUrl: v2,
      desc: "Embark on a Coastal Adventure: Discover Tranquility, Embrace Nature's Beauty, and Immerse Yourself in the Blissful Rhythms of the Ocean at Our Breathtaking Beach Getaways!",
      name: "Sunkissed Serenity: Embrace the Beauty of Beach Adventures!",
      url:"amazon.in",
    },
    {
      id: 3,
      videoUrl: v3,
      desc: "Embrace the Vibrant Rhythm of Urban Living: Unveil the Energetic Charms, Endless Possibilities, and Diverse Delights of City Life. Immerse Yourself in the Heartbeat of a Thriving Metropolis.",
      name: "Unveil Urban Wonders: Explore Vibrant Cities, Yours to Conquer!",
      url:"",
    },
    {
      id: 4,
      videoUrl: v4,
      desc: "Revel in the Majestic Beauty of Mountain Escapes: Discover Serenity Amidst Towering Peaks, Pristine Wilderness, and Fresh Mountain Air. Embrace Adventure and Find Tranquility in Nature's Grandeur.",
      name: "Reach New Heights: Embrace the Majesty of the Mountains!",
      url:"",
    },
    {
      id: 5,
      videoUrl: v5,
      desc: "Embark on an Enchanting Journey Amidst the Mountains: Where Adventure Beckons and Serenity Awaits. Immerse Yourself in Breathtaking Vistas and Unearth the Magic of Nature's Marvels.",
      name: "Discover the Magic of Mountains: Where Adventure Awaits!",
      url:"",
    },
  ];

  return (
    <div className="hero_parent">
      <div className="bg_ele1"></div>
      <div className="bg_ele2"></div>
      <div className="hero_main">
        <div id="slide" ref={slideRef}>
          {data.map((item, index) => (
            <div
              key={item.id}
              className="item"
            >
              <video
                autoPlay
                muted
                loop
              >
              <source src={item.videoUrl} type="video/mp4"/>
              </video>    
              <div className="content">
                <button onClick={handleClickPrev}>
                  <Backward />
                </button>
          
                {/* <div> */}
                  <h1>{item.name}</h1>
                  {/* <p>{item.desc}</p> */}
                  {/* <a href={item.url}>See more</a> */}
                {/* </div> */}

                <button onClick={handleClickNext}>
                  <Forward />
                </button>
              </div>
            </div>
          ))}
        </div>

        
      </div>
      <div className="booking_form">
        <div className="desti">
          <form>
            <label htmlFor="destination">Destination:</label>
            <input type="text" id="destination" list="destinationList" name="destination" autoComplete="off" placeholder="Where do you want to go?"/> 
              <i className="fas fa-map-marker-alt"></i>
            <datalist id="destinationList">
              <option value="Delhi" />
              <option value="Mumbai" />
              <option value="Kolkata" />
              <option value="Chennai" />
              <option value="Bangalore" />
              <option value="Hyderabad" />
              <option value="Ahmedabad" />
              <option value="Pune" />
              <option value="Surat" />
              <option value="Jaipur" />
              <option value="Kanpur" />
              <option value="Lucknow" />
              <option value="Nagpur" />
              <option value="Patna" />
              <option value="Indore" />
              <option value="Vadodara" />
              <option value="Bhopal" />
              <option value="Coimbatore" />
              <option value="Ludhiana" />
              <option value="Kochi" />
              <option value="Visakhapatnam" />
              <option value="Agra" />
              <option value="Varanasi" />
              </datalist>
          </form>
        </div>

        <div className="in">
          <form>
            <label htmlFor="checkin">Check-In:</label>
            <input type="date" className="checkin" name="checkin" autoComplete="off" placeholder="Check-In"/>
          </form>
        </div>

        <div className="out">
          <form>
            <label htmlFor="checkout">Check-Out:</label>
            <input type="date" className="checkout" name="checkout" autoComplete="off" placeholder="Check-Out"/>
          </form>
        </div>
        
        <div className="book">
          <form>
            <button>Book Now</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Hero;
