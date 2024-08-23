import './EventCard.css'

function EventCard() {
    return(
        
        <div class="event-container">
            <div class="event-card">
            <img src="https://cdn.kobo.com/book-images/002f669b-cc2e-4ccf-b78e-c969d456620c/1200/1200/False/wuthering-heights-124.jpg" alt="Example Image" class="event-image"/>
            <h2 class="event-title">Card Title</h2>
            <p class="event-time">Event date and time</p> 
            </div>

            <div class="event-card">
            <img src="https://m.media-amazon.com/images/I/91dq1VnYDiL._AC_UF894,1000_QL80_.jpg" alt="Example Image" class="card-image"/>
            <h2 class="event-title">Card Title</h2>
            <p class="event-time">Event date and time</p> 
            </div>

        </div>

    )
}

export default EventCard