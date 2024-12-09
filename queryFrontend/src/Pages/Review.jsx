import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { getQuiz, getReviewsByQuizId } from '../../quizApi'; // Assuming this is your API for fetching quiz data

function Review() {
    const { id } = useParams(); // Correct destructuring of the 'id' from URL
    const [quiz, setQuiz] = useState(null);
    const [reviews, setReviews] = useState([]);

    // Mock reviews data
    const mockReviews = [
        {
            nickname: 'JohnDoe123',
            reviewtext: 'Great quiz! Really enjoyed the questions.',
            rating: 5,
        },
        {
            nickname: 'JaneDoe456',
            reviewtext: 'It was good, but could use some more challenging questions.',
            rating: 4,
        },
        {
            nickname: 'PlayerOne',
            reviewtext: 'Not bad, but I expected more variety.',
            rating: 3,
        },
    ];

    useEffect(() => {
        handleFetch();
    }, [id]); // Fetch quiz data whenever the quiz ID changes

    const handleFetch = () => {

        setReviews(mockReviews);

        // getReviewsByQuizId(id)
        // .then(data => setReviews(data))
        // .catch(error => console.error('Error fetching reviews:', error));

        getQuiz(id)
            .then(data => setQuiz(data))
            .catch(error => console.error('Error fetching quiz:', error));
    };
    //Function to calculate the avarage rating of a quiz
    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0; 
        const sum = reviews.reduce((total, review) => total + review.rating, 0);
        return (sum / reviews.length).toFixed(1); 
    };

    return (
        <div style={{ padding: '20px' }}>

            <Typography variant="h4" gutterBottom>
                Reviews of Quiz: {quiz ? quiz.name : 'Loading...'}
            </Typography>
            <Typography variant="h6" style={{ marginTop: '20px' }}>

            {reviews.length > 0 ? (
                <Typography variant="body2" style={{ marginTop: '20px' }}>
                    {calculateAverageRating()}/5 rating average based on {reviews.length} reviews
                </Typography>
            ) : (
                <Typography variant="body2" style={{ marginTop: '20px' }}>
                    No reviews yet.
                </Typography>
            )}
            </Typography>


            <Link to="/writereview/:id/reviews">Write your review</Link>

            
            <div
                style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                }}
            >

                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <Card
                            key={index}
                            elevation={3}
                            style={{
                                padding: '20px',
                                marginBottom: '20px',
                                height: 'auto',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {review.nickname}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Rating: {review.rating}/5
                                </Typography>
                                <Typography variant="body1">{review.reviewtext}</Typography>
                                <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                                    Written on: {review.date}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>No reviews yet.</Typography>
                )}
            </div>
        </div>
    );
}

export default Review;
