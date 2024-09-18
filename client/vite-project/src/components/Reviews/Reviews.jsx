import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Reviews.css';
import StarRating from '../StarRating/StarRating';
import Cookies from 'js-cookie';
import {fetchBookReviewsById} from '../Utils/apiUtils';

export default function Reviews() {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(0);
    const location = useLocation();
    const { bookId, title, coverImageUrl, rating, reviews = [] } = location.state || {} 
    const [ratingModal, setRatingModal] = useState(false)
    const [reviewList, setReviewList] = useState([]);
    
    useEffect(() => {
        setReviewList(reviews)
    }, [reviews])

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        console.log('Comment:', comment);
        console.log('Rating:', userRating);

        await postReview()
        setComment('');
        setUserRating(0);
        await refreshReviews();
        toggleRatingModal();
    };

    const refreshReviews = async() => {
        const updatedReviews = await fetchBookReviewsById(bookId)
        console.log('updated reviews ', updatedReviews)
        setReviewList(updatedReviews)
    }

    const toggleRatingModal = () => {
        setRatingModal(!ratingModal)
    }

    const postReview = async() => {
        const reviewData = {
            username: Cookies.get('uname'),   
            bookId: bookId,
            rating: userRating,
            review: comment,    
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
                <div className='avg-rating-container'>
                    <div className="book-title">{title}</div>
                    <div className="average-rating">
                        Average Rating: 
                        <span className="stars">★★★★★</span>
                        <span>({rating})</span>
                    </div>
                    <br/>
                    <button className='add-review-button' onClick={toggleRatingModal}>Add your review</button>
                </div>
                
                {ratingModal && (
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={toggleRatingModal}>&times;</span>
                            <br/>
                            
                                <div className="leave-comment-section">
                                <StarRating rating={userRating} setRating={setUserRating} /> 
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
            <div className='comment-container'>
                {reviewList.length > 0 ? (
                    reviewList.map((review) => (
                        
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
            </div>
        <br/>
        </div>
    );
}