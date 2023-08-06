import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userWishlistCollection } from '../firebaseConfig';
import {
    getDocs,
    collection,
    query,
    where,
    onSnapshot,
} from 'firebase/firestore';
import '../index.css';
import '../styles/Wishlist.css';
import CardItems from './CardItems';

function Wishlist() {
    const [destinations, setDestinations] = useState([]);
    const userToken = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState({ name: '', email: '', profilePic: '' });

    useEffect(() => 
    {
        if (userToken) 
        {
            fetchDataFromProtectedAPI(userToken);
        }
    }, [userToken]);

    useEffect(() => 
    {
        if (user.email) 
        {
            const realTimeListener = setupRealtimeListener();
            
            return () => 
            {
                realTimeListener();
            };
        }
    }, [user.email]);

    const fetchDataFromProtectedAPI = async (userToken) => 
    {
        try 
        {
            const config = 
            {
                headers: 
                {
                    Authorization: `Bearer ${userToken}`,
                },
            };
            const response = await axios.get("http://localhost:3000/api/user", config);
            setUser(response.data.user);
        } 
        catch (error) 
        {
            console.error("Error fetching data:", error);
        }
    };

    const setupRealtimeListener = () => 
    {
        const q = query(userWishlistCollection, where("email", "==", user.email));
        return onSnapshot(q, (snapshot) => 
        {
            const updatedDestinations = snapshot.docs.map((doc) => doc.data());
            setDestinations(updatedDestinations);
        });
    };

    return (
        <div className="wishlist_parent">
            {destinations.map(destination => (
                <div key={destination.id}>
                    <CardItems destination={destination} />
                </div>
            ))}
        </div>
    );
}

export default Wishlist;
