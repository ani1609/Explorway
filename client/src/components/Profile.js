import { Link } from 'react-router-dom';
import React, { useRef, useEffect, useState } from "react";
import "../styles/Profile.css";
import "../index.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {ReactComponent as ProfileIcon} from '../icons/profile.svg';
import {ReactComponent as Plus} from '../icons/plus.svg';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import MyProfileSubComponent from './MyProfileSubComponent.js';
import Address from './Address';
import Wishlist from './Wishlist.js';
import ChangePassword from './ChangePassword';
import MountainBG from '../images/mountain_bg.jpg';
import BeachBG from '../images/beach_bg.jpg';
import VillageBG from '../images/village_bg.jpg';
import CityBG from '../images/city_bg.jpg';

function Profile(props) 
{
    const userToken = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState({name:"",email:"",profilePic:""});
    const [showMyProfile, setShowMyProfile] = useState(props.showMyProfile);
    const [showAddress, setShowAddress] = useState(props.showAddress);
    const [showWishlist, setShowWishlist] = useState(props.showWishlist);
    const [showChangePassword, setShowChangePassword] = useState(props.showChangePassword);
    const [showLogOut, setShowLogOut] = useState(false);
    const navigate = useNavigate();

    const fetchDataFromProtectedAPI = async (userToken) => 
    {
        try 
        {
            const config = {
                headers: {
                Authorization: `Bearer ${userToken}`,
                },
            };
            const response = await axios.get("https://explorway-server.vercel.app/api/user", config);
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

    const handleLogout = () => 
    {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    return(
        <div className='profile_parent'>
            {user?.preferredLocationType == "Mountains" && <img src={MountainBG} alt="Mountain" className='profile_bg'/>}
            {user?.preferredLocationType == "Beaches" && <img src={BeachBG} alt="Mountain" className='profile_bg'/>}
            {user?.preferredLocationType == "Cities" && <img src={CityBG} alt="Mountain" className='profile_bg'/>}
            {user?.preferredLocationType == "Villages" && <img src={VillageBG} alt="Mountain" className='profile_bg'/>}
            {/* {showMyProfile && <h1>My Profile</h1>}
            {showAddress && <h1>Address Book</h1>}
            {showWishlist && <h1>My Wishlist</h1>}
            {showChangePassword && <h1>Change Password</h1>}
            {showLogOut && <h1>&nbsp;</h1>} */}
            <div className='profile_contents'>
                <div className='profile_list'>
                    <div className='profile_list_header'>
                        {user?.profilePic ?
                            <img src={`https://explorway-server.vercel.app/${user.profilePic}`} alt="Profile" className="profile-pic" />
                            :
                            <ProfileIcon className='profile_icon'/>
                        }
                        <h4>{user.name}</h4>
                    </div>

                    <ul>
                        <li className={showMyProfile? 'span_width_5':'span_width_0'}> <span></span><Link to={"/account/myProfile"} style={{ textDecoration: 'none' }}>My Profile</Link></li>
                        <li className={showAddress? 'span_width_5':'span_width_0'}> <span></span><Link to={"/account/address"} style={{ textDecoration: 'none' }}>Address</Link></li>
                        <li className={showWishlist? 'span_width_5':'span_width_0'}> <span></span><Link to={"/account/wishlist"} style={{ textDecoration: 'none' }}>Wishlist</Link></li>
                        <li className={showChangePassword? 'span_width_5':'span_width_0'}> <span></span><Link to={"/account/changePassword"} style={{ textDecoration: 'none' }}>Change Password</Link></li>
                        <li className={showLogOut? 'span_width_5':'span_width_0'} onClick={handleLogout}><span></span>Log Out</li>
                    </ul>
                </div>

                <div className='profile_right_block'>
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