import React from 'react';
import '../index.css';
import '../styles/Login.css';
import Logo from "../images/logof.png";
import Bg from '../images/loginbg2.png';

function Login()
{
    return(
        <div className='login_parent'>
            <div className='login_content'>
                <div className='left'>
                    <a href="" className='login_logo'>
                        <img src={Logo} alt="logo"/>
                        <p>Trekwise</p>
                    </a>
                    <h1>Welcome Back</h1>
                    <form>
                        <input type='text' placeholder='Email'/>
                        <input type='password' placeholder='Password'/>
                        <p>Don't have an account?<a href=''>Get one</a></p>
                        <button type='submit'>Login</button>
                    </form>
                    
                </div>
                <div className='right'>
                    <img src={Bg}/>
                </div>
            </div>
        </div>
    );
}

export default Login;