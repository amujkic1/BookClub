import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Reviews.css';
import StarRating from '../StarRating/StarRating';

export default function Reviews() {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(0);
    const location = useLocation();
    const { title, coverImageUrl, rating, reviews = [] } = location.state || {} 
    const [ratingModal, setRatingModal] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault(); 

        console.log('Comment:', comment);
        console.log('Rating:', userRating);

        postReview()
        setComment('');
        setUserRating(0);
    };

    const toggleRatingModal = () => {
        setRatingModal(!ratingModal)
    }

    const postReview = async() => {
        const reviewData = {
            username: "Edna",   
            bookId: "66e08c9b6530d3e059c08a0f",
            rating: userRating,
            review: "My favorite book",    
        };
        try{
            //const response = await fetch("https://bookclub-6dmc.onrender.com/review", {
            const response = await fetch("http://localhost:3000/review", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(reviewData),
            });
            const res = await response.json();
            console.log(res);
        }catch(err){
            console.error("Failed to post a review")
        }
    }

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
                    <br/>
                    <button onClick={toggleRatingModal}>button</button>
                </div>
                
                {ratingModal && (
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={toggleRatingModal}>&times;</span>
                            <br/>
                            <StarRating rating={userRating} setRating={setUserRating} /> 
                                <div className="leave-comment-section">
                                    <label for="comment">Leave a comment:</label>
                                    <textarea 
                                        id="comment" 
                                        placeholder="Write your comment here..." 
                                        rows="4"
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}>
                                    </textarea>
                                    <button type="submit" onClick={handleSubmit}>Post Comment</button>
                                </div>
                        </div>
                    </div>
                )}
                
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