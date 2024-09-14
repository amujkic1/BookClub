import { useState } from 'react';
import './Reviews.css';

export default function Reviews() {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');

    return(
            <div class="book-review-section">
            <div class="book-header">
                <img src="https://www.univ.ox.ac.uk/wp-content/uploads/2018/11/North-and-South.jpg" alt="Book Cover" class="book-cover"/>
                <div>
                    <div class="book-title">Book Title Here</div>
                    <div class="average-rating">
                        Average Rating: 
                        <span class="stars">★★★★★</span>
                        <span>(4.5)</span>
                    </div>
                </div>
            </div>
            <br></br>
            <h3>Reviews</h3>

            <div class="comment-section">
                

                <div class="comment">
                    <div class="user-name">User1</div>
                    <div class="user-rating">
                        Rating: <span class="stars">★★★★☆</span>
                    </div>
                    <div class="user-comment">
                        Great book! I really enjoyed the plot and character development.
                    </div>
                </div>

                <div class="comment">
                    <div class="user-name">User1</div>
                    <div class="user-rating">
                        Rating: <span class="stars">★★★★☆</span>
                    </div>
                    <div class="user-comment">
                        Great book! I really enjoyed the plot and character development.
                    </div>
                </div>

                <div class="comment">
                    <div class="user-name">User1</div>
                    <div class="user-rating">
                        Rating: <span class="stars">★★★★☆</span>
                    </div>
                    <div class="user-comment">
                        Great book! I really enjoyed the plot and character development.
                    </div>
                </div>

                <div class="comment">
                    <div class="user-name">User1</div>
                    <div class="user-rating">
                        Rating: <span class="stars">★★★★☆</span>
                    </div>
                    <div class="user-comment">
                        Great book! I really enjoyed the plot and character development.
                    </div>
                </div>

                <div class="comment">
                    <div class="user-name">User1</div>
                    <div class="user-rating">
                        Rating: <span class="stars">★★★★☆</span>
                    </div>
                    <div class="user-comment">
                        Great book! I really enjoyed the plot and character development.
                    </div>
                </div>

                <div class="comment">
                    <div class="user-name">User1</div>
                    <div class="user-rating">
                        Rating: <span class="stars">★★★★☆</span>
                    </div>
                    <div class="user-comment">
                        Great book! I really enjoyed the plot and character development.
                    </div>
                </div>

            </div>
        </div>
    );

}