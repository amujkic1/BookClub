import './BookCard.css'

function BookCard({image, title, author}) {
    return(
        
        <div className="card">
        <img src={image} alt="Example Image" className="card-image"/>
        <h2 className="card-title">{title}</h2>
        <h2 className="card-author">{author}</h2>
        </div>

    )
}

export default BookCard