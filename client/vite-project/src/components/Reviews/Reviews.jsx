import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Reviews.css';
import StarRating from '../StarRating/StarRating';

export default function Reviews() {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [stars, setStars] = useState(0)
    const location = useLocation();
    const { title, coverImageUrl, rating, reviews = [] } = location.state || {} 
    
    useEffect(() => {
        console.log('location.state:', location.state);
        console.log('Reviews:', reviews);
    }, [location.state, reviews]);

    return(
            <div className="book-review-section">
            <div className="book-header">
                <img src={coverImageUrl} alt="Book Cover" className="book-cover"/>
                <div>
                    <div className="book-title">{title}</div>
                    <div className="average-rating">
                        Average Rating: 
                        <span className="stars">★★★★★</span>
                        <span>({rating})</span>
                    </div>
                    <div>
                        <StarRating rating={stars} setRating={setStars} />
                    </div>
                </div>
            </div>
            <br></br>
            <h3>Reviews</h3>

            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className="comment-section">
                        <div className="comment">
                            <div className="user-name">{review.user?.username || 'Anonymous'}</div>
                            <div className="user-rating">
                                Rating: <span className="stars">★★★★★</span> {review.rating}
                            </div>
                            <div className="user-comment">{review.review}</div>
                        </div>
                    </div>    
                ))
            ) : (
                <p>No reviews available for this book.</p>
            )}

        <br/>



        </div>
        
    );

}