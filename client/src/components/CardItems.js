import React from 'react';
import { useState } from 'react';
import '../styles/CardItems.css';
import "../index.css";

function CardItems(props)
{
    const [showPlantrip, setShowPlanTrip] = useState(false);

    const {img, place, description, location, price, url}=props.destination;


    return(
        <div className='carditem_parent'
            onMouseEnter={() => setShowPlanTrip(true)}
            onMouseLeave={() => setShowPlanTrip(false)}
        >
            <div className={showPlantrip ? 'place low-w':'place high-w'}>
                <img src={img} alt="destination"/>
                <h3>{place}</h3>
                <p>{description}</p>
                <div className='location_price'>
                    <div className='location'>
                        <i class="fa-solid fa-location-dot"></i>
                        <span>{location}</span>
                    </div>
                    <div className='price'>
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        <span>{price}</span>
                    </div>
                </div>
            </div>
            {showPlantrip && <button>
                Plan trip
                <i class="fa-solid fa-arrow-right"></i>
            </button>}
        </div>
    );
}

export default CardItems;


