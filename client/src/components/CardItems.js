import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/CardItems.css';
import "../index.css";
import {ReactComponent as Heart} from '../images/heart.svg';
import {ReactComponent as HeartSolid} from '../images/heart_solid.svg';
import { db, userDataCollection } from '../firebaseConfig';
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
        // console.log("User:", user);
        // console.log("User email:", user.email);
        try 
        {
            const userObject = {
                email: user.email,
                itemId: id,
            };
        
            // console.log("Adding user object:", userObject);
        
            const newDocRef = await addDoc(userDataCollection, userObject);
            // console.log("Document added with ID:", newDocRef.id);
        } 
        catch (error) 
        {
            console.error("Error adding document:", error);
        }
        // printAllDocuments('wishlist');
        // deleteAllDocuments('userData');
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


