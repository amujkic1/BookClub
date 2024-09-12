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
                <p>to your favorite book-sharing platform.</p>
            </div>
        </header>
        <div className="button-group">
                <button onClick={goToChatPage}>Go to Chat</button>
            </div>
        <main>
            <section className="about-section">
                <h2>About Us</h2>
                <p>ShareABook is your one-stop platform for discovering, sharing, and discussing books. Whether you’re an avid reader or just starting your reading journey, we offer a space where book lovers can connect.</p>
            </section>
            <section className="events-section">
                <h2>Upcoming Events</h2>
                <p>Join our upcoming book reading events and meet fellow book enthusiasts.</p>
            </section>
        </main>
            <section className="recommendations-section">
                <h2>Our recommendations</h2>
            </section>
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
                    <button onClick={scrollLeftt}>&lt;</button>
                    <button onClick={scrollRight}>&gt;</button>
            </div>
            <br/>
            <br/>
            <footer>
                <p>&copy; 2024 ShareABook. All rights reserved.</p>
            </footer>
        </div>
    );
}
