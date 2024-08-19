import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../BookCard/BookCard';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();

    const goToAdminPage = () => {
        navigate('/admin');
    };

    return (
        <div className="content">
            <header>
                <h1>Welcome to ShareABook</h1>
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
            </main>
            <BookCard />
            <footer>
                <p>&copy; 2024 ShareABook. All rights reserved.</p>
            </footer>
        </div>
    );
}
