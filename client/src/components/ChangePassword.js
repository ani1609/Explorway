import React, { useState, useEffect } from 'react';
import '../index.css';
import '../styles/ChangePassword.css';
import axios from 'axios';
import {ReactComponent as Visible} from '../icons/eyeVisible.svg';
import {ReactComponent as Disabled} from '../icons/eyeDisabled.svg';

function ChangePassword() 
{
    const userToken = JSON.parse(localStorage.getItem('token'));
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [newPasswordOldPasswordMatch, setNewPasswordOldPasswordMatch] = useState(true);
    const [eyeVisible1, setEyeVisible1] = useState(false);
    const [eyeVisible2, setEyeVisible2] = useState(false);
    const [eyeVisible3, setEyeVisible3] = useState(false);

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
            setUserData({ ...userData, email: response.data.user.email });
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

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        if (userData.newPassword !== userData.confirmNewPassword)
        {
            setPasswordMatch(false);
            console.log("Passwords do not match");
            return;
        }
        setPasswordMatch(true);
        try 
        {
            const response = await axios.post('http://localhost:3000/api/changePassword', userData);
            console.log(response.data.message);
        } 
        catch (error) 
        {
            if (error.response.status === 401) 
            {
                setWrongPassword(true);
                console.log("Invalid email or password");
                return;
            }
            if (error.response.status === 409) 
            {
                setNewPasswordOldPasswordMatch(false);
                console.log("New password cannot be the same as old password");
                return;
            }
            console.error('Error changing password:', error);
        }
    }

    return (
        <div className="change_password_parent">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">Old Password:</label>
                    <input
                        type={eyeVisible1 ? "text" : "password"}
                        name="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        required
                    />
                    {eyeVisible1 && <Visible onClick={()=>setEyeVisible1(!eyeVisible1)} className="eye_icon"/>}
                    {!eyeVisible1 && <Disabled onClick={()=>setEyeVisible1(!eyeVisible1)} className="eye_icon"/>}
                </div>
                <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type={eyeVisible2 ? "text" : "password"}
                        name="newPassword"
                        value={userData.newPassword}
                        onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}
                        required 
                    />
                    {eyeVisible2 && <Visible onClick={()=>setEyeVisible2(!eyeVisible2)} className="eye_icon"/>}
                    {!eyeVisible2 && <Disabled onClick={()=>setEyeVisible2(!eyeVisible2)} className="eye_icon"/>}
                </div>
                <div>
                    <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                    <input
                        type={eyeVisible3 ? "text" : "password"}
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={userData.confirmNewPassword}
                        onChange={(e) => setUserData({ ...userData, confirmNewPassword: e.target.value })}
                        required
                    />
                    {eyeVisible3 && <Visible onClick={()=>setEyeVisible3(!eyeVisible3)} className="eye_icon"/>}
                    {!eyeVisible3 && <Disabled onClick={()=>setEyeVisible3(!eyeVisible3)} className="eye_icon"/>}
                </div>
                <div></div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;