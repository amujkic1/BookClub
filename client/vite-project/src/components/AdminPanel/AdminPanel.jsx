import { useState, useEffect } from 'react'
import './AdminPanel.css'
import update_icon from '../Assets/update.png'
import delete_icon from '../Assets/delete.png'

export default function AdminPanel() {

    const [userModal, setUserModal] = useState(false)
    const [eventModal, setEventModal] = useState(false)
    const [bookModal, setBookModal] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [eventName, setEventName] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventTime, setEventTime] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishDate, setPublishDate] = useState('')
    const [isbn, setIsbn] = useState('')
    const [genre, setGenre] = useState('')
    const [summary, setSummary] = useState('')
    const [coverImageUrl, setCoverImageUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedView, setSelectedView] = useState('home') 
    const [users, setUsers] = useState([])

    const toggleUserModal = () => {
        setUserModal(!userModal)
    }

    const toggleEventModal = () => {
        setEventModal(!eventModal)
    }

    const toggleBookModal = () => {
        setBookModal(!bookModal)
    }

    const handleCreateUser = async (event) => {
        //fetch('https://bookclub-6dmc.onrender.com/user/user', {
        fetch('http://localhost:3000/user/user', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, email, password })
            })
            .then(async response => {
                if(response.ok) {
                    setErrorMessage('')
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    setUserModal(false)
                    fetchUsers()
                }else{
                    const errorData = await response.json();
                    setErrorMessage(errorData.error || 'An error occurred');
                }
            })
            .catch(error => {
                setErrorMessage('Failed to create a user.');
            })
    }

    const handleCreateEvent = () => {
        fetch('http://localhost:3000/event', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ name: eventName, date: eventDate, time: eventTime, location: eventLocation })
            })
            .then(async response => {
                if(response.ok) {
                    setEventModal(false)
                }else{
                    const errorData = await response.json();
                    setErrorMessage(errorData.error || 'An error occurred');
                }
            })
            .catch(error => {
                setErrorMessage('Failed to create an event.');
            })

    }

    const handleCreateBook = () => {
        fetch('http://localhost:3000/book', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ title, author, publishDate, isbn, genre, summary, coverImageUrl })
            })
            .then(async response => {
                if(response.ok) {
                    setBookModal(false)
                }else{
                    const errorData = await response.json();
                    setErrorMessage(errorData.error || 'An error occurred');
                }
            })
            .catch(error => {
                setErrorMessage('Failed to create a book.');
            })
    }

    const handleDeleteUser = async (userEmail) => {
        //fetch('https://bookclub-6dmc.onrender.com/user/user', {
        fetch('http://localhost:3000/user/user', {
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email: userEmail })
            })
            .then(async response => {
                if(response.ok) {
                    fetchUsers()
                }else{
                    const errorData = await response.json();
                }
            })
            .catch(error => {
                setErrorMessage('Failed to delete a user.');
            })
    }

    const fetchUsers = async (event) => {
        //fetch('https://bookclub-6dmc.onrender.com/user/users', {
        fetch('http://localhost:3000/user/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            })
            .then(async response => {
                const data = await response.json()
                setUsers(data)
            })
            .catch(error => {
                setErrorMessage("Failed to retreive users.")
            })
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <>
        <div className="body-container">
            
            <div className="aheader">
                <h1>Admin Panel</h1>
            </div>
            
            <div className="acontainer">
                <div className="sidebar">
                    <h2>Dashboard</h2>
                    <a href="#" onClick={() => setSelectedView('home')}>Home</a>
                    <a href="#" onClick={() => setSelectedView('users')}>Users</a>
                    <a href="#" onClick={() => setSelectedView('settings')}>Settings</a>
                    <a href="#" onClick={() => setSelectedView('reports')}>Reports</a>
                    <a href="#" onClick={() => setSelectedView('logout')}>Logout</a>
                </div>
                <div className="main-content">
                    {selectedView === 'home' && (
                        <div>
                            <h1>Welcome, Admin</h1>
                            <div className="button-container">
                                <button className="button1" onClick={toggleUserModal}>Create a User</button>
                                <button className="button2" onClick={toggleBookModal}>Add a Book</button>
                                <button className="button3" onClick={toggleEventModal}>Organize an Event</button>
                            </div>
                        </div>
                    )}
                    
                    {selectedView === 'users' && (
                        <div className='listContainer'>
                            <h1>Users Management</h1>
                            <ul className='usersList'>
                                {users.map(user => (
                                    <li className='usersListItem' key={user._id}>
                                        {user.username} - {user.email}
                                        <img src={delete_icon} onClick={() => handleDeleteUser(user.email) }></img>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    {selectedView === 'settings' && (
                        <div>
                            <h1>Settings</h1>
                            <p>Settings options will be displayed here.</p>
                        </div>
                    )}
                    
                    {selectedView === 'reports' && (
                        <div>
                            <h1>Reports</h1>
                            <p>Reports will be displayed here.</p>
                        </div>
                    )}
                    
                    {selectedView === 'logout' && (
                        <div>
                            <h1>Logout</h1>
                            <p>You have logged out.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
        {userModal && (
            <div id="myModal" className="modal">

            <div className="modal-content">
              <span className="close" onClick={toggleUserModal}>&times;</span>
              <div className='header'>
                <h2>Create a new user</h2>
              </div>                
              <div className='inputs'>
                <div className="input">
                        <input type='username' 
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            placeholder='username'>
                        </input>
                </div>
                <div className="input">
                        <input type='email' 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder='email'>
                        </input>
                </div>
                <div className="input">
                        <input type='password' 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder='password'>
                        </input>
                </div>
              </div>
               <div className='submit-container'>
                    <div className="usubmit" onClick={handleCreateUser}>Create</div>
               </div>
               {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>          
          </div>            
        )}

        {eventModal && (
            <div id="myModal" className="modal">

            <div className="modal-content">
              <span className="close" onClick={toggleEventModal}>&times;</span>
              <div className='header'>
                <h2>Create a new event</h2>
              </div>                
              <div className='inputs'>
                <div className="input">
                        <input type='eventName' 
                            onChange={(e) => setEventName(e.target.value)}
                            value={eventName}
                            placeholder='Event name'>
                        </input>
                </div>
                <div className="input">
                        <input type='date' 
                            onChange={(e) => setEventDate(e.target.value)}
                            value={eventDate}
                            placeholder='date'>
                        </input>
                </div>
                <div className="input">
                        <input type='time' 
                            onChange={(e) => setEventTime(e.target.value)}
                            value={eventTime}
                            placeholder='time'>
                        </input>
                </div>
                <div className="input">
                        <input type='location' 
                            onChange={(e) => setEventLocation(e.target.value)}
                            value={eventLocation}
                            placeholder='location'>
                        </input>
                </div>
              </div>
               <div className='submit-container'>
                    <div className="usubmit" onClick={handleCreateEvent}>Create</div>
               </div>
               {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>          
          </div>            
        )}

        {bookModal && (
        <div id="myModal" className="modal">
            <div className="modal-content">
            <span className="close" onClick={toggleBookModal}>&times;</span>
            <div className='header'>
                <h2>Create a new book</h2>
            </div>                
            <div className='inputs'>
                <div className="input">
                <input type='text' 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder='Title'>
                </input>
                </div>
                <div className="input">
                <input type='text' 
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    placeholder='Author'>
                </input>
                </div>
                <div className="input">
                <input type='date' 
                    onChange={(e) => setPublishDate(e.target.value)}
                    value={publishDate}
                    placeholder='Publish Date'>
                </input>
                </div>
                <div className="input">
                <input type='text' 
                    onChange={(e) => setIsbn(e.target.value)}
                    value={isbn}
                    placeholder='ISBN'>
                </input>
                </div>
                <div className="input">
                <input type='text' 
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                    placeholder='Genre'>
                </input>
                </div>
                <div className="input">
                <textarea 
                    onChange={(e) => setSummary(e.target.value)}
                    value={summary}
                    placeholder='Summary'>
                </textarea>
                </div>
                <div className="input">
                <input type='url' 
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    value={coverImageUrl}
                    placeholder='Cover Image URL'>
                </input>
                </div>
            </div>
            <div className='submit-container'>
                <div className="usubmit" onClick={handleCreateBook}>Create</div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>          
        </div>            
        )}
        

        </>
    )
}
