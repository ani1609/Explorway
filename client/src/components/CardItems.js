import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/CardItems.css';
import "../index.css";
import {ReactComponent as Heart} from '../icons/heart.svg';
import {ReactComponent as HeartSolid} from '../icons/heart_solid.svg';
import { db, userWishlistCollection } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, setDoc, onSnapshot} from 'firebase/firestore';
import { set } from 'mongoose';

function CardItems(props)
{
    const [showPlantrip, setShowPlanTrip] = useState(false);
    const {id, img, place, description, location, price}=props.destination;
    const userToken = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState({name:"",email:"",profilePic:""});
    const [wishlisted, setWishlisted] = useState(false);


    const heartStyle = {
        fill: '#F25278',
        width: '22px',
        height: '22px',
        cursor: 'pointer'
    };
    
    const fetchDataFromProtectedAPI = async (userToken) => 
    {
      try 
      {
        const config = {
            headers: {
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

    useEffect(() =>
    {
        if (userToken)
        {
            fetchDataFromProtectedAPI(userToken);
        }
    }, []);

    const handleHeartClick = async () => 
    {
        if (!userToken)
        {
            alert("Please login to add to wishlist");
            return;
        }

        try 
        {
            const userObject = 
            {
                email: user.email,
                img: img,
                place: place,
                description: description,
                location: location,
                price: price,
                id: id,
            };
    
            // Check if a document with the same email and itemId exists
            const querySnapshot = await getDocs(userWishlistCollection);
            const matchingDoc = querySnapshot.docs.find(doc => 
                {
                const data = doc.data();
                return data.email === userObject.email && data.id === userObject.id;
            });
    
            if (matchingDoc) 
            {
                await deleteDoc(matchingDoc.ref);
                console.log("Preexisting document deleted:", matchingDoc.id);
            }
            else
            {
                const newDocRef = await addDoc(userWishlistCollection, userObject);
                console.log("New document added with ID:", newDocRef.id);
            }
        }
        catch (error) 
        {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (user.email) {
            const setHeartStyle = async () => {
                const querySnapshot = await getDocs(userWishlistCollection);
                const matchingDoc = querySnapshot.docs.find(doc => {
                    const data = doc.data();
                    return data.email === user.email && data.id === id;
                });
    
                setWishlisted(!!matchingDoc); // Set initial status
    
                // Listen for real-time changes to the wishlist collection
                const unsubscribe = onSnapshot(userWishlistCollection, (snapshot) => {
                    let isWishlisted = false;
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        if (data.email === user.email && data.id === id) {
                            isWishlisted = true;
                        }
                    });
                    setWishlisted(isWishlisted);
                });
    
                return () => {
                    // Unsubscribe the real-time listener when component unmounts
                    unsubscribe();
                };
            };
    
            setHeartStyle();
        }
    }, [user.email, id]);
    
    
    

    return(
        <div className='carditem_parent'
            onMouseEnter={() => setShowPlanTrip(true)}
            onMouseLeave={() => setShowPlanTrip(false)}
        >
            <div className={showPlantrip ? 'place low-w':'place high-w'}>
                <img src={img} alt="destination"/>
                <h3>
                    {place}
                    {
                        wishlisted ?
                        <HeartSolid onClick={handleHeartClick} style={heartStyle}/>
                        :
                        <Heart onClick={handleHeartClick} style={heartStyle}/>
                    }
                </h3>
                
                {/* <Heart/> */}
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


