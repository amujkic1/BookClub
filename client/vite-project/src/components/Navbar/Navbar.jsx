import "./Navbar.css"

export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="site-title">ShareABook</a>
        <ul>
            <li>
                <a href="/admin">Admin</a>
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