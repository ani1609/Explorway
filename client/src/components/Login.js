import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import '../index.css';
import '../styles/Login.css';
import Logo from "../images/logof.png";
import Bg from '../images/boy2.png';

function Login()
{
    const navigate = useNavigate();
    const [invalidEmail, setInvalidEmail] = useState(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    // const fetchDataFromProtectedAPI = async (userToken) => 
    // {
    //     try 
    //     {
    //         const config = {
    //             headers: {
    //               Authorization: `Bearer ${userToken}`,
    //             },
    //         };
      
    //         const response = await axios.get("http://localhost:3000/api/user", config);
    //         user.name=response.data.user.name;
    //         user.email=response.data.user.email;
    //         user.profilePic=response.data.user.profilePic;
    //         console.log("User is ",user);
    //     } 
    //     catch (error) 
    //     {
    //       console.error("Error fetching data:", error);
    //     }
    // };

      
    const handleLoginSubmit = async (e) => 
    {
        e.preventDefault();
        try
        {
            const response = await axios.post("http://localhost:3000/api/users/login", loginData);
            localStorage.clear();
            localStorage.setItem('token', JSON.stringify(response.data.token));
            // const userToken = JSON.parse(localStorage.getItem('token'));
            // console.log("user token is login",userToken);
            setInvalidEmail(false);
            navigate('/');
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
                        required
                        />

                        <input 
                        type
                        ='password'
                        value={loginData.password}
                        placeholder='Password'
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                        />

                        <p>Don't
                             have an account?&nbsp;<Link to="/signup"><a href=''>Get one</a></Link></p>
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
