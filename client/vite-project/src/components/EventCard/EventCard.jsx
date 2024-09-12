import './EventCard.css'

function EventCard() {
    return(
        
        <div className="event-container">
            <div className="event-card">
            <img src="https://cdn.kobo.com/book-images/002f669b-cc2e-4ccf-b78e-c969d456620c/1200/1200/False/wuthering-heights-124.jpg" alt="Example Image" className="event-image"/>
            <h2 className="event-title">Card Title</h2>
            <p className="event-time">Event date and time</p> 
            </div>

            <div className="event-card">
            <img src="https://m.media-amazon.com/images/I/91dq1VnYDiL._AC_UF894,1000_QL80_.jpg" alt="Example Image" className="card-image"/>
            <h2 className="event-title">Card Title</h2>
            <p className="event-time">Event date and time</p> 
            </div>

        </div>

    )
}

export default EventCard