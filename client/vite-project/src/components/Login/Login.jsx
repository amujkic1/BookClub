import { useState, useContext } from 'react';
import './Login.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import person_icon from '../Assets/person.png';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSignUp = async (event) => {

        event.preventDefault();

        fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password })
        })
        .then(async response => {
            console.log('Response:', response);
            if(response.ok) {
                const {email,token} = await response.json()
                login(token)
                setErrorMessage('')
                navigate('/home')
            }else{
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'An error occurred');
            }
        })
        .catch(error => {
            console.error('Signup error:', error);
            setErrorMessage('Failed to sign up. Please try again.');
        })
    }
    
    const handleLogin = async (event) => {
        event.preventDefault();
    
        fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ username, email, password }),
        })
          .then(async (response) => {
            if (response.ok) {
              const { token } = await response.json();
              login(token);
              setErrorMessage('');
              navigate('/home')
            } else {
              const errorData = await response.json();
              setErrorMessage(errorData.error || 'An error occurred');
            }
          })
          .catch((error) => {
            console.error('Login error:', error);
            setErrorMessage('Failed to login. Please try again.');
          });
      };

    return(

        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={person_icon} alt=""></img>
                    <input type='person' 
                           onChange={(e) => setUsername(e.target.value)}
                           value={username}></input>
                </div>
                <div className="input">
                    <img src={email_icon} alt=""></img>
                    <input type='email' 
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}>
                    </input>
                </div>
                <div className="input">
                    <img src={password_icon} alt=""></img>
                    <input type='password' 
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}></input>
                </div>
            </div>

            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            <div className="submit-contaier">
                <div className="submit" onClick={handleSignUp}>Sign Up</div>
                <div className="submit" onClick={handleLogin}>Login</div>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    )
}

export default Login;