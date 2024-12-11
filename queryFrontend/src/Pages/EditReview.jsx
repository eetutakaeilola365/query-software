import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Snackbar } from '@mui/material';
import { getReview, updateReview } from '../../quizApi';

function EditReview() {
    const { reviewId } = useParams();
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewtext, setReviewtext] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getReview(reviewId)
            .then(data => {
                setNickname(data.nickname);
                setRating(data.rating);
                setReviewtext(data.reviewtext);
            })
            .catch(err => setError(err.message));
    }, [reviewId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedReview = { nickname, rating, reviewtext };
        updateReview(reviewId, updatedReview)
            .then(response => {
                setSnackbarOpen(true);
                console.log("Update successful:", response);
                navigate(`/quiz/${response.quizId}/reviews`);
            })
            .catch((error) => {
                console.error('Error updating review:', error);
                alert('Failed to update review.');
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h4" component="h1">Edit Review</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
            />
            <TextField
                label="Rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
            />
            <TextField
                label="Review"
                value={reviewtext}
                onChange={(e) => setReviewtext(e.target.value)}
                multiline
                rows={4}
                required
            />
            <Button type="submit" variant="contained" color="primary">Update</Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Review updated successfully!"
            />
        </Box>
    );
}

export default EditReview;