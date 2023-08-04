import { Link } from 'react-router-dom';
import React, { useRef, useEffect, useState } from "react";
import "../styles/Profile.css";
import "../index.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Profile() 
{
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

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
        setTime(new Date());
        }, 1000);

        return () => {
        clearInterval(intervalId);
        };
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = hours % 12 || 12;

    const formattedHours = String(twelveHourFormat).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');


    return(
        <div className='profile_parent'>
            <div className='profile_list'>
                <div className='profile_list_header'>
                    <label>
                        <FontAwesomeIcon icon={faUser} className='profile_icon'/>
                        <input type='file' className='file-input' />
                    </label>
                    <div>
                        <h4>{user.name}</h4>
                        <p>{formattedHours}:{formattedMinutes}:{formattedSeconds} {amOrPm}</p>
                    </div>
                </div>

                <ul>
                    <li><span></span>My Profile</li>
                    <li><span></span>Address</li>
                    <li><span></span>Wishlist</li>
                    <li><span></span>Change Password</li>
                    <li><span></span>Log Out</li>
                </ul>
            </div>

            <div className='profile_left_block'>

            </div>
        </div>
    );
}


export default Profile;