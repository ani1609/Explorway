import React, { useEffect, useState } from 'react';
import WishlistItems from './WishlistItems';
import axios from 'axios';
import '../index.css';
import '../styles/Wishlist.css';
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

function Wishlist() {
    const [destinations, setDestinations] = useState([]);
    const [empty, setEmpty] = useState(false);
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
            const response = await axios.get("https://explorway-server.vercel.app/api/user", config);
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
            if (updatedDestinations.length === 0) 
            {
                setEmpty(true);
            }
            else
            {
                setEmpty(false);
            }
            setDestinations(updatedDestinations);
        });
    };

    return (
        <div className="wishlist_parent">
            {empty && <h3>Your wishlist is empty. Checkout our best <a href=''>destinations</a> now!</h3>}
            {destinations.map(destination => (
                <div key={destination.id}>
                    <WishlistItems destination={destination} />
                </div>
            ))}
        </div>
    );
}

export default Wishlist;
