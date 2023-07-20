import React from 'react';
import '../index.css';
import '../styles/Login.css';
import Logo from "../images/logof.png";
import Bg from '../images/boy2.png';

function Login()
{
    return(
        <div className='login_parent'>
            <div className='login_content'>
                <div className='l_left'>
                    <a href="" className='ls_logo'>
                        <img src={Logo} alt="logo"/>
                        <p>Trekwise</p>
                    </a>
                    <h1>Welcome Back</h1>
                    <form>
                        <input type='email' placeholder='Email'/>
                        <input type='password' placeholder='Password'/>
                        <p>Don't have an account?&nbsp;<a href=''>Get one</a></p>
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