import './AdminPanel.css'

export default function AdminPanel() {
    return(
        
        <div className="body-container">
            <div className="aheader">
                <h1>Admin Panel</h1>
            </div>
            <div className="acontainer">
                <div className="sidebar">
                    <h2>Dashboard</h2>
                    <a href="#">Home</a>
                    <a href="#">Users</a>
                    <a href="#">Settings</a>
                    <a href="#">Reports</a>
                    <a href="#">Logout</a>
                </div>
                <div className="main-content">
                    <h1>Welcome, Admin</h1>
                    <div className="button-container">
                        <button className="button1">Create a User</button>
                        <button className="button2">Add a Book</button>
                        <button className="button3">Organize an Event</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
