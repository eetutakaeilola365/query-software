import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { getQuiz } from '../../quizApi'; // Assuming this is your API for fetching quiz data

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

        getQuiz(id)
            .then(data => setQuiz(data))
            .catch(error => console.error('Error fetching quiz:', error));
    };

    return (
        <div style={{ padding: '20px' }}>

            <Typography variant="h4" gutterBottom>
                Reviews of Quiz: {quiz ? quiz.name : 'Loading...'}
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
