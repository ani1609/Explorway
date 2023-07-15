import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import "./index.css";
import v1 from "./videos/t2.mp4";
import v2 from "./videos/t11.mp4";
import v3 from "./videos/t5.mp4";
import v4 from "./videos/t9.mp4";
import v5 from "./videos/t7.mp4";

const Header = () => {
  const slideRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [videoIndex, setVideoIndex] = useState(1);

  useEffect(() => {
    const items = slideRef.current.querySelectorAll(".item");
    items.forEach((item, index) => {
      if (index === 1) {
        const videoElements = item.querySelectorAll("video");
        videoElements.forEach((video) => video.play());
      }
      else 
      {
        const videoElements = item.querySelectorAll("video");
        videoElements.forEach((video) => video.pause());
      }
    });
    // console.log("videoIndex: ", videoIndex);
  }, [videoIndex]);

  const handleClickNext = async () => {
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

  const handleClickPrev = async () => {
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
      name: "Experience Dreamy Resorts",
      url:"",
    },
    {
      id: 2,
      videoUrl: v2,
      desc: "Embark on a Coastal Adventure: Discover Tranquility, Embrace Nature's Beauty, and Immerse Yourself in the Blissful Rhythms of the Ocean at Our Breathtaking Beach Getaways!",
      name: "Uncover Sun-Kissed Shores",
      url:"amazon.in",
    },
    {
      id: 3,
      videoUrl: v3,
      desc: "Embrace the Vibrant Rhythm of Urban Living: Unveil the Energetic Charms, Endless Possibilities, and Diverse Delights of City Life. Immerse Yourself in the Heartbeat of a Thriving Metropolis.",
      name: "Immerse in Vibrant Cities",
      url:"",
    },
    {
      id: 4,
      videoUrl: v4,
      desc: "Revel in the Majestic Beauty of Mountain Escapes: Discover Serenity Amidst Towering Peaks, Pristine Wilderness, and Fresh Mountain Air. Embrace Adventure and Find Tranquility in Nature's Grandeur.",
      name: "Explore Enchanting Peaks",
      url:"",
    },
    {
      id: 5,
      videoUrl: v5,
      desc: "Embark on an Enchanting Journey Amidst the Mountains: Where Adventure Beckons and Serenity Awaits. Immerse Yourself in Breathtaking Vistas and Unearth the Magic of Nature's Marvels.",
      name: "Embrace Majestic Mountains",
      url:"",
    },
  ];

  return (
    <div className="header_parent">
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
              className="bg_video"
            >
            <source src={item.videoUrl} type="video/mp4"/>
            </video>    
            <div className="content">
              <div className="name">{item.name}</div>
              <div className="des">{item.desc}</div>
              <a href={item.url}>See more</a>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button id="prev" onClick={handleClickPrev}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button id="next" onClick={handleClickNext}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default Header;
