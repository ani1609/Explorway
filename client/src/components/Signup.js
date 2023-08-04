import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import '../index.css';
import '../styles/Signup.css';
import Logo from "../images/logof.png";
import Bg from '../images/boy2.png';


function Signup()
{
    const navigate = useNavigate();
    const [userExists, setUserExists] = useState(false);
    const [passwordUnmatched, setPasswordUnmatched] = useState(false);

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        c_password: "",
    });
    
    const handleSignupSubmit = async (e) =>
    {
        e.preventDefault();
        if (signupData.password !== signupData.c_password)
        {
            setPasswordUnmatched(true);
            console.error("Passwords do not match");
            return;
        }
        try
        {
            const response = await axios.post("http://localhost:3000/api/users/signup", signupData);
            localStorage.clear();
            localStorage.setItem('token', JSON.stringify(response.data.token));
            // console.log(response.data.token);
            setUserExists(false);
            navigate('/');
        }
        catch(error)
        {
            if (error.response.status === 409)
            {
                setUserExists(true);
                console.error(error.response.data.message);
                return;
            }
            console.error(error.response.data.message);
        }
    };
    return(
        <div className='signup_parent'>
            <div className='signup_content'>
                <div className='s_left'>
                    <a href="" className='ls_logo'>
                        <img src={Logo} alt="logo"/>
                        <p>Trekwise</p>
                    </a>
                    <h1>Join Us</h1>
                    <form onSubmit={handleSignupSubmit}>
                        <input
                        type='text'
                        placeholder='Name'
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        required
                        />
                        <input
                        type='email'
                        placeholder='Email'
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                        />
                        <input
                        type='password'
                        placeholder='Password'
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                        />
                        <input
                        type='password'
                        placeholder='Confirm Password'
                        value={signupData.c_password}
                        onChange={(e) => setSignupData({ ...signupData, c_password: e.target.value })}
                        required
                        />

                        <p>Already have an account?&nbsp; <Link to="/login"><a href=''>Log in</a></Link></p>
                        <button type='submit'>Sign Up</button>
                    </form>
                    
                </div>
                <div className='s_right'>
                    <img src={Bg}/>
                </div>
            </div>
        </div>
    );
}

export default Signup;