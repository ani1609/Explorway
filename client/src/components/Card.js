import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Card.css';
import "../index.css";
import CardItems from './CardItems';
import p1 from '../images/place1_c.jpg';
import p2 from '../images/place2_c.jpg';
import p3 from '../images/place3_c.jpg';
import p4 from '../images/place4_c.jpg';
import p5 from '../images/place5_c.jpg';
import p6 from '../images/place6_c.jpg';
import p7 from '../images/place7_c.jpg';
import p8 from '../images/place8_c.jpg';
import p9 from '../images/place9_c.jpg';

function Card()
{
    // const destinations= [
    //     {
    //         img: p1,
    //         place: "Gardens by the Bay",
    //         description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
    //         location: "Singapore",
    //         price: 79999,
    //         url: "",
    //         id: 1
    //     },
    //     {
    //         img: p2,
    //         place: "South Island",
    //         description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
    //         location: "New Zealand",
    //         price: 69999,
    //         url: "",
    //         id: 2
    //     },
    //     {
    //         img: p3,
    //         place: "Grand Canyon",
    //         description: "Lorem ipsum may be used as a placeholder before final copy is availble to be put in.",
    //         location: "Arazona, USA",
    //         price: 49999,
    //         url: "",
    //         id: 3
    //     },
    //     {
    //         img: p4,
    //         place: "Jungfraujoch",
    //         description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
    //         location: "Switzerland",
    //         price: 89999,
    //         url: "",
    //         id: 4
    //     },
    //     {
    //         img: p5,
    //         place: "Eiffel Tower",
    //         description: "Lorem ipsum may be used as a placeholder before final copy is availble to be put in.",
    //         location: "Paris, France",
    //         price: 29999,
    //         url: "",
    //         id: 5
    //     },
    //     {
    //         img: p6,
    //         place: "Closseum",
    //         description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
    //         location: "Rome, Italy",
    //         price:39999,
    //         url: "",
    //         id: 6
    //     },
    //     {
    //         img: p7,
    //         place: "Tower Bridge",
    //         description: "Lorem ipsum may be used as a placeholder before final copy is availble to be put in.",
    //         location: "London, UK",
    //         price: 59999,
    //         url: "",
    //         id: 7
    //     },
    //     {
    //         img: p8,
    //         place: "Burj Khalifa",
    //         description: "Lorem ipsum may be used as a placeholder before final copy is availble.",
    //         location: "Dubai, UAE",
    //         price: 99999,
    //         url: "",
    //         id: 8
    //     }
    // ];

    const [destinations, setDestinations] = useState([]); // Initialize the state with an empty array

    const fetchDestinations = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/getDestinations');
          setDestinations(response.data);
        } catch (error) {
          console.error('Error fetching destinations:', error);
        }
      };

    useEffect(() => {
        fetchDestinations();
    }, []);

    return(
        <div className='cards'>
            <div className="bg_ele7"></div>
            <div className="bg_ele8"></div>

            <div className="cards_heading">
                    <h1>Top</h1>
                    <h2>Destinations</h2>
                    <h1>for you</h1>
            </div>
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
            </div>
            <button type='submit'>View All Destinations</button>
            <div className="bg_ele9"></div>
            <div className="bg_ele10"></div>
        </div>
    );
}

export default Card;

