import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WishlistItems.css";
import "../index.css";
import { db, userWishlistCollection } from "../firebaseConfig";
import {
    getDocs,
    collection,
    query,
    where,
    onSnapshot,
    deleteDoc, 
    addDoc,
} from "firebase/firestore";
import {ReactComponent as HeartSolid} from '../icons/heart_solid.svg';
import {ReactComponent as Location} from '../icons/location2.svg';
import {ReactComponent as Rupee} from '../icons/rupee.svg';


function WishlistItems(props) 
{
    const { id, img, place, description, location, price } = props.destination;
    const [user, setUser] = useState({ name: '', email: '', profilePic: '' });
    const userToken = JSON.parse(localStorage.getItem('token'));


    const heartStyle =
    {
        fill: '#F25278',
        width: '22px',
        height: '22px',
        cursor: 'pointer'
    };


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

    useEffect(() => 
    {
        if (userToken) 
        {
            fetchDataFromProtectedAPI(userToken);
        }
    }, [userToken]);

    const handleHeartClick = async (e) => 
    {
        e.preventDefault();
        try 
        {
            // Check if a document with the same email and itemId exists
            const querySnapshot = await getDocs(userWishlistCollection);
            const matchingDoc = querySnapshot.docs.find(doc => 
                {
                const data = doc.data();
                return data.email === user.email && data.id === id;
            });
            await deleteDoc(matchingDoc.ref);
        }
        catch (error) 
        {
            console.error("Error:", error);
        }
    };


    return (
        <a href="" className="wishlistitem_parent">
            <img src={img}/>
            <div className="details">
                <h2>
                    {place}
                    <HeartSolid style={heartStyle} onClick={handleHeartClick}/>
                </h2>
                <p>{description}</p>
                <div className="loc_pri">
                    <div>
                        <i class="fa-solid fa-location-dot"></i>
                        <span>{location}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        <span>{price}</span>
                    </div>
                </div>
            </div>
        </a>
    );

}

export default WishlistItems;
