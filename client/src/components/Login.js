import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../index.css';
import '../styles/Login.css';
import Logo from "../images/logof.png";
import Bg from '../images/boy2.png';

function Login()
{
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [token, setToken] = useState("");

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const fetchDataFromProtectedAPI = async (userToken) => 
    {
        console.log("user token is ",userToken);
        try 
        {
            const config = {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
            };
      
            const response = await axios.get("http://localhost:3000/api/user", config);
      
            console.log("Data from protected API:", response.data);
        } 
        catch (error) 
        {
          console.error("Error fetching data:", error);
        }
    };

      
    const handleLoginSubmit = async (e) => 
    {
        e.preventDefault();
        try
        {
            const response = await axios.post("http://localhost:3000/api/users/login", loginData);
            console.log("Front----",response.data.user);
            setToken(response.data.token);
            await fetchDataFromProtectedAPI(response.data.token);
            setInvalidEmail(false);
        }
        catch(error)
        {
            if (error.response.status === 401)
            {
              setInvalidEmail(true);
              console.error(error.response.data.message);
              return;
            }
            console.error(error.response.data.message);
        }
    }


    return(
        <div className='login_parent'>
            <div className='login_content'>
                <div className='l_left'>
                    <a href="" className='ls_logo'>
                        <img src={Logo} alt="logo"/>
                        <p>Trekwise</p>
                    </a>
                    <h1>Welcome Back</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <input 
                        type='email'
                        value={loginData.email}
                        placeholder='Email'
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />

                        <input 
                        type
                        ='password'
                        value={loginData.password}
                        placeholder='Password'
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        />

                        <p>Don't
                             have an account?&nbsp;<a href=''>Get one</a></p>
                        <button type='submit'>Login</button>
                    </form>
                    
                </div>
                <div className='l_right'>
                    <img src={Bg}/>
                </div>
            </div>
        </div>
    );
}

export default Login;
