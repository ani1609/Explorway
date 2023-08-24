import React, { useState, useEffect } from 'react';
import '../index.css';
import '../styles/ChangePassword.css';
import axios from 'axios';

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
        console.log(userData);
        setPasswordMatch(true);
        try 
        {
            const response = await axios.post('http://localhost:3000/api/changePassword', userData);
            // console.log(response);
        } 
        catch (error) 
        {
            console.error('Error changing password:', error);
        }
    }

    return (
        <div className="change-password-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    required
                />
                <label htmlFor="newPassword">New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    placeholder="Confirm New Password"
                    value={userData.newPassword}
                    onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}
                    required 
                />
                <label htmlFor="confirmNewPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                    value={userData.confirmNewPassword}
                    onChange={(e) => setUserData({ ...userData, confirmNewPassword: e.target.value })}
                    required
                />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;