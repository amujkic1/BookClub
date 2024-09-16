import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Reviews.css';

export default function Reviews() {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const location = useLocation();
    const { title, coverImageUrl, rating } = location.state || {} 
    
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
                </div>
            </div>
            <br></br>
            <h3>Reviews</h3>

            <div className="comment-section">
                <div className="comment">
                    <div className="user-name">User1</div>
                    <div className="user-rating">
                        Rating: <span className="stars">★★★★☆</span>
                    </div>
                    <div className="user-comment">
                        Great book! I really enjoyed the plot and character development.
                    </div>
                </div>
            </div>
        </div>
    );

}