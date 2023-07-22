import React from 'react';
import '../styles/Card.css';
import "../index.css";
import CardItems from './CardItems';
import p1 from '../images/place1.jpg';
import p2 from '../images/place2.jpg';
import p3 from '../images/place3.jpg';
import p4 from '../images/place4.jpg';
import p5 from '../images/place5.jpg';
import p6 from '../images/place6.jpg';
import p7 from '../images/place7.jpg';
import p8 from '../images/place8.jpg';
import p9 from '../images/place9.jpg';
import p10 from '../images/place10.jpg';

function Card()
{
    const destinations= [
        {
            img: p6,
            place: "Gardens by the Bay",
            description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
            location: "Singapore",
            price: 79999,
            id: 1
        },
        {
            img: p5,
            place: "South Island",
            description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
            location: "New Zealand",
            price: 69999,
            id: 2
        },
        {
            img: p3,
            place: "Grand Canyon",
            description: "Lorem ipsum may be used as a placeholder before final copy is availble to be put in.",
            location: "Arazona, USA",
            price: 49999,
            id: 3
        },
        {
            img: p7,
            place: "Jungfraujoch",
            description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
            location: "Switzerland",
            price: 89999,
            id: 4
        },
        {
            img: p1,
            place: "Eiffel Tower",
            description: "Lorem ipsum may be used as a placeholder before final copy is availble to be put in.",
            location: "Paris, France",
            price: 29999,
            id: 5
        },
        {
            img: p2,
            place: "Closseum",
            description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
            location: "Rome, Italy",
            price:39999,
            id: 6
        },
        {
            img: p4,
            place: "Tower Bridge",
            description: "Lorem ipsum may be used as a placeholder before final copy is availble to be put in.",
            location: "London, UK",
            price: 59999,
            id: 7
        },
        {
            img: p8,
            place: "Burj Khalifa",
            description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
            location: "Dubai, UAE",
            price: 99999,
            id: 8
        }
    ];

    return(
        <div className='cards'>
            <h1>Top Destinations For You</h1>
            <div className='destinations-container'>
                {destinations.map((destination) =>{
                    return (
                        <div>
                            <CardItems
                            destination={destination}
                            key={destination.id}
                            />
                        </div>
                    )
                })}
                {/* <div className='grid_item'></div>
                <div className='grid_item'></div>
                <div className='grid_item'></div>
                <div className='grid_item'></div>
                <div className='grid_item'></div>
                <div className='grid_item'></div>
                <div className='grid_item'></div>
                <div className='grid_item'></div>
                <div className='grid_item'></div> */}
            </div>
            <button type='submit'>View All Destinations</button>
        </div>
    );
}

export default Card;

