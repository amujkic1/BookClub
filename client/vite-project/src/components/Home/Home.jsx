import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import './Home.css'

export default function Home() {

    return (
        <div class="content">
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
            </main>
            <BookCard/>
            <footer>
                <p>&copy; 2024 ShareABook. All rights reserved.</p>
            </footer>
        </div>
    );
}
