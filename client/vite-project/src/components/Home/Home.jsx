import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../BookCard/BookCard';
import Cookies from 'js-cookie';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = Cookies.get('uname');
        if(storedUsername){
            setUsername(storedUsername);
        }
    }, []);

    const goToAdminPage = () => {
        navigate('/admin');
    };

    const goToChatPage = () => {
        navigate('/chat');
    };

    return (
        <div className="content">
            <header>
                <h1>Welcome, {username}</h1>
                <p>Your favorite book sharing platform.</p>
            </header>
            <main>
                <section>
                    <h2>About Us</h2>
                    <p>We are a community of book lovers who share and discover new books together.</p>
                </section>
                <br/>
                <br/>
                <section>
                    <h2>Upcoming Events</h2>
                    <p>Join our upcoming book reading events and meet fellow book enthusiasts.</p>
                </section>
                <br/>
                <br/>
                <button onClick={goToAdminPage}>Go to Admin Page</button>
                <button onClick={goToChatPage}>Go to Chat</button>
            </main>
            <BookCard />
            <footer>
                <p>&copy; 2024 ShareABook. All rights reserved.</p>
            </footer>
        </div>
    );
}
