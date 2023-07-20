import React from 'react';
import '../index.css';
import '../styles/Signup.css';
import Logo from "../images/logof.png";
import Bg from '../images/boy2.png';

function Signup()
{
    return(
        <div className='signup_parent'>
            <div className='signup_content'>
                <div className='s_left'>
                    <a href="" className='ls_logo'>
                        <img src={Logo} alt="logo"/>
                        <p>Trekwise</p>
                    </a>
                    <h1>Join Us</h1>
                    <form>
                        <input type='text' placeholder='Name'/>
                        <input type='email' placeholder='Email'/>
                        <input type='password' placeholder='Password'/>
                        <input type='password' placeholder='Confirm Password'/>
                        <p>Already have an account?&nbsp; <a href=''>Log in</a></p>
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