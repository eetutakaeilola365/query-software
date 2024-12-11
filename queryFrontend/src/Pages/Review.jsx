import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { getQuiz, getReviewsByQuizId, deleteReview } from '../../quizApi';

function Review() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        handleFetch();
    }, [id]);

    const handleFetch = () => {
        getQuiz(id)
            .then(data => setQuiz(data))
            .catch(error => console.error('Error fetching quiz:', error));

        getReviewsByQuizId(id)
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    };

    const handleDelete = (reviewId) => {

        const confirmed = window.confirm("Are you sure you want to delete this review?");

        if (confirmed) {
            deleteReview(reviewId)
                .then(() => {
                    setReviews(reviews.filter(review => review.reviewid !== reviewId));
                })
                .catch(error => {
                    console.error('Error deleting review:', error);
                });
        } else {
            console.log('Delete action was cancelled');
        }
    };


    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((total, review) => total + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Reviews of "{quiz ? quiz.name : 'Loading...'}"
            </Typography>

            <Typography variant="h6" style={{ marginTop: '20px' }}>
                {reviews.length > 0 && (
                    <Typography variant="body2" style={{ marginTop: '20px' }}>
                        {calculateAverageRating()}/5 rating average based on {reviews.length} reviews
                    </Typography>
                )}
            </Typography>

            <Link to={`/quiz/${id}/reviews/writereview`}>Write your review</Link>

            <div
                style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    marginTop: '20px'
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
                                position: 'relative',
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
                                    Written on: {review.date || 'N/A'}
                                </Typography>
                            </CardContent>
                            <div style={{ position: 'absolute', top: '10px', right: '10px', }}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDelete(review.reviewid)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    component={Link}
                                    to={`/quiz/${id}/reviews/${review.reviewid}`}
                                    variant="outlined"
                                    color="success"
                                    style={{ margin: '8px' }}
                                >
                                    Edit
                                </Button>
                            </div>
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



