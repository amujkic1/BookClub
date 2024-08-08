import { useState } from 'react';
import './Login.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import person_icon from '../Assets/person.png';

function Login() {

    return(

        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={email_icon} alt=""></img>
                    <input type='email'></input>
                </div>
                <div className="input">
                    <img src={password_icon} alt=""></img>
                    <input type='password'></input>
                </div>
            </div>
            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            <div className="submit-contaier">
                <div className="submit">Sign Up</div>
                <div className="submit">Login</div>
            </div>
        </div>
    )
}

export default Login;