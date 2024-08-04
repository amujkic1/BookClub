import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://bookclub-6dmc.onrender.com/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

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
                <section>
                    <h2>Upcoming Events</h2>
                    <p>Join our upcoming book reading events and meet fellow book enthusiasts.</p>
                </section>
                <section>
                    <h2>Users</h2>
                    {users.length > 0 ? (
                        <ul>
                            {users.map(user => (
                                <li key={user._id}>{user.username} ({user.email})</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </section>
            </main>
            <footer>
                <p>&copy; 2024 ShareABook. All rights reserved.</p>
            </footer>
        </div>
    );
}
