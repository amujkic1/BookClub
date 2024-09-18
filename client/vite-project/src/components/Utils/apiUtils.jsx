export const fetchBookReviewsById = async (bookId) => {
    try {
        //const response = await fetch(`https://bookclub-6dmc.onrender.com/reviews/${bookId}`, {
        const response = await fetch(`http://localhost:3000/reviews/${bookId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        console.log('fetching...')
        const data = await response.json();
        console.log('Fetched reviews:', data); 
        return data;
    } catch (error) {
        console.error("Failed to retrieve reviews.");
        return null;
    }
};
