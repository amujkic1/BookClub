import "./Navbar.css"

export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="site-title">ShareABook</a>
        <ul>
            <li className="active">
                <a href="/events">Events</a>
            </li>
            <li>
                <a href="/favorites">Favorites</a>
            </li>
            <li>
            <a href="/profile">My Profile</a>
            </li>
        </ul>
        </nav>
}