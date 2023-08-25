import { Link } from 'react-router-dom';
import React, { useRef, useEffect, useState } from "react";
import "../styles/Profile.css";
import "../index.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MyProfileSubComponent from './MyProfileSubComponent.js';
import Address from './Address';
import Wishlist from './Wishlist.js';
import ChangePassword from './ChangePassword';

function Profile(props) 
{
    const userToken = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState({name:"",email:"",profilePic:""});
    const [showMyProfile, setShowMyProfile] = useState(props.showMyProfile);
    const [showAddress, setShowAddress] = useState(props.showAddress);
    const [showWishlist, setShowWishlist] = useState(props.showWishlist);
    const [showChangePassword, setShowChangePassword] = useState(props.showChangePassword);
    const [showLogOut, setShowLogOut] = useState(false);

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


    const handlemyProfileClick = () =>
    {
        setShowMyProfile(true);
        setShowAddress(false);
        setShowWishlist(false);
        setShowChangePassword(false);
        setShowLogOut(false);
    };

    const handleWishlistClick = () =>
    {
        setShowWishlist(true);
        setShowMyProfile(false);
        setShowAddress(false);
        setShowChangePassword(false);
        setShowLogOut(false);
    };
    
    const handleAddressClick = () =>
    {
        setShowAddress(true);
        setShowMyProfile(false);
        setShowWishlist(false);
        setShowChangePassword(false);
        setShowLogOut(false);
    };

    const handleChangePasswordClick = () =>
    {
        setShowChangePassword(true);
        setShowMyProfile(false);
        setShowAddress(false);
        setShowWishlist(false);
        setShowLogOut(false);
    };

    const handleLogOutClick = () =>
    {
        setShowLogOut(true);
        setShowMyProfile(false);
        setShowAddress(false);
        setShowWishlist(false);
        setShowChangePassword(false);
    };



    return(
        <div className='profile_parent'>
            {showMyProfile && <h1>My Profile</h1>}
            {showAddress && <h1>Address Book</h1>}
            {showWishlist && <h1>My Wishlist</h1>}
            {showChangePassword && <h1>Change Password</h1>}
            {showLogOut && <h1>&nbsp;</h1>}
            <div className='profile_contents'>
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
                        <li className={showMyProfile? 'span_width_5':'span_width_0'}> <span></span><Link to={"/profile/myProfile"} style={{ textDecoration: 'none' }}>My Profile</Link></li>
                        <li className={showAddress? 'span_width_5':'span_width_0'}> <span></span><Link to={"/profile/address"} style={{ textDecoration: 'none' }}>Address</Link></li>
                        <li className={showWishlist? 'span_width_5':'span_width_0'}> <span></span><Link to={"/profile/wishlist"} style={{ textDecoration: 'none' }}>Wishlist</Link></li>
                        <li className={showChangePassword? 'span_width_5':'span_width_0'}> <span></span><Link to={"/profile/changePassword"} style={{ textDecoration: 'none' }}>Change Password</Link></li>
                        <li className={showLogOut? 'span_width_5':'span_width_0'}><span></span>Log Out</li>
                    </ul>
                </div>

                <div className='profile_left_block'>
                    {
                        props.showMyProfile && <div>
                            <MyProfileSubComponent />
                        </div>
                    }
                    
                    {
                        props.showWishlist && <div>
                            <Wishlist />
                        </div>
                    }

                    {
                        props.showAddress && <div>
                            <Address />
                            </div>
                    }

                    {
                        props.showChangePassword && <div>
                            <ChangePassword />
                            </div>
                    }
                    
                </div>
            </div>
        </div>
    );
}


export default Profile;