import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Card.css';
import "../index.css";
import CardItems from './CardItems';

function Card()
{

    const [destinations, setDestinations] = useState([]); // Initialize the state with an empty array

    const fetchDestinations = async () => {
        try {
          const response = await axios.get('https://explorway-server.vercel.app/api/getAllDestinations');
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
                {destinations.map((destination, index) =>{
                    return (
                        <div key={index}>
                            <CardItems
                            destination={destination}
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

