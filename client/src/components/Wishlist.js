import React, { useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import '../styles/Wishlist.css';

function Wishlist() {

    const fetchDestinationsById = async (id) =>
    {
        try
        {
            const response = await axios.get(`http://localhost:3000/api/getDestinations/byId?id=${id}`);
            console.log(response.data);
        }
        catch (error)
        {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() =>
    {
        fetchDestinationsById(5);
    }, []);


    return (
        <div className="wishlist_parent">
            qejkwqkejgbrqw
        </div>
    );
}

export default Wishlist;
