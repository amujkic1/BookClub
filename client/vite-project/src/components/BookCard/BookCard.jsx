import './BookCard.css'

function BookCard({image, title, author}) {
    return(
        
        <div class="card">
        <img src={image} alt="Example Image" class="card-image"/>
        <h2 class="card-title">{title}</h2>
        <h2 class="card-author">{author}</h2>
        </div>

    )
}

export default BookCard