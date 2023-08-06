import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/CardItems.css';
import "../index.css";
import {ReactComponent as Heart} from '../images/heart.svg';
import {ReactComponent as HeartSolid} from '../images/heart_solid.svg';
import { db, userWishlistCollection } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';

function CardItems(props)
{
    const [showPlantrip, setShowPlanTrip] = useState(false);
    const {id, img, place, description, location, price}=props.destination;
    const heartStyle = {
        fill: '#F25278',
        width: '22px',
        height: '22px',
        cursor: 'pointer'
    };

    const userToken = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState({name:"",email:"",profilePic:""});
    
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
        // console.log(response.data.user);
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

    async function deleteAllDocuments(collectionName) {
        const collectionRef = collection(db, collectionName);
        try {
          const querySnapshot = await getDocs(collectionRef);
          
          querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
          
          console.log('All documents deleted successfully.');
        } catch (error) {
          console.error('Error deleting documents:', error);
        }
    }

    async function printAllDocuments(collectionName) {
        const collectionRef = collection(db, collectionName);
        
        try {
          const querySnapshot = await getDocs(collectionRef);
          
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data().itemId);
          });
        } catch (error) {
          console.error('Error printing documents:', error);
        }
    }

    const handleHeartClick = async () => 
    {
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
                itemId: id,
            };
    
            // Check if a document with the same email and itemId exists
            const querySnapshot = await getDocs(userWishlistCollection);
            const matchingDoc = querySnapshot.docs.find(doc => 
                {
                const data = doc.data();
                return data.email === userObject.email && data.itemId === userObject.itemId;
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
            // deleteAllDocuments('userWishlist');
        }
        catch (error) 
        {
            console.error("Error:", error);
        }
    };
    
    

    return(
        <div className='carditem_parent'
            onMouseEnter={() => setShowPlanTrip(false)}
            onMouseLeave={() => setShowPlanTrip(false)}
        >
            <div className={showPlantrip ? 'place low-w':'place high-w'}>
                <img src={img} alt="destination"/>
                <h3>
                    {place}
                    <Heart onClick={handleHeartClick} style={heartStyle}/>
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


