import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../BookCard/BookCard';
import Cookies from 'js-cookie';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [bookDetails, setBookDetails] = useState([]);

    useEffect(() => {
        const storedUsername = Cookies.get('uname');
        if(storedUsername){
            setUsername(storedUsername);
        }
        fetchBooks();
    }, []);

    const goToAdminPage = () => {
        navigate('/admin');
    };

    const goToChatPage = () => {
        navigate('/chat');
    };

    const fetchBooks = async (event) => {
        //fetch('https://bookclub-6dmc.onrender.com/books', {
        fetch('http://localhost:3000/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(async response => {
            const data = await response.json()
            setBookDetails(data.books)
            console.log(bookDetails)
        }).catch(error => {
            setErrorMessage("Failed to retreive books.")
        })
    }

    function scrollLeftt() {
        const container = document.getElementById('scrollWrapper');
        container.scrollBy({ left: -110, behavior: 'smooth' });
        console.log('left');
    }

    function scrollRight() {
        const container = document.getElementById('scrollWrapper');
        container.scrollBy({ left: 110, behavior: 'smooth' });
        console.log('right');
    }

    return (
        <div className="content">
        <header className="home-header">
            <div className="header-content">
                <h1>Welcome, {username}</h1>
                <p>Your favorite book-sharing platform.</p>
            </div>
        </header>
        <main>
            <section className="about-section">
                <h2>About Us</h2>
                <p>We are a community of book lovers who share and discover new books together.</p>
            </section>
            <section className="events-section">
                <h2>Upcoming Events</h2>
                <p>Join our upcoming book reading events and meet fellow book enthusiasts.</p>
            </section>
            <div className="button-group">
                <button onClick={goToAdminPage}>Go to Admin Page</button>
                <button onClick={goToChatPage}>Go to Chat</button>
            </div>
        </main>
            <div id="scrollWrapper" className="card-container">
                {bookDetails.map((book) => (
                    <BookCard
                    key={book._id}
                    title={book.title}
                    author={book.author}
                    image={book.coverImageUrl}
                    />
                ))}
            </div>
            <div className='controls'>
                    <button onClick={scrollLeftt}>Scroll Left</button>
                    <button onClick={scrollRight}>Scroll Right</button>
            </div>
            <footer>
                <p>&copy; 2024 ShareABook. All rights reserved.</p>
            </footer>
        </div>
    );
}
