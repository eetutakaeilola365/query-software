import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Snackbar } from '@mui/material';
import { getReview, updateReview } from '../../quizApi';

function EditReview() {
    const { id: quizId, reviewid: reviewId } = useParams();
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

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedReview = { nickname, rating, reviewtext };
        updateReview(reviewId, updatedReview)
            .then(response => {
                setSnackbarOpen(true);
                console.log("Update successful:", response);
                navigate(`/quiz/${quizId}/reviews`);
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
            <Typography variant="h4" component="h1">Edit your Review</Typography>
            <TextField
                label="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
            />
            <Typography component="legend">Rating</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {[
                    { value: 1, label: '1 - Useless' },
                    { value: 2, label: '2 - Poor' },
                    { value: 3, label: '3 - Ok' },
                    { value: 4, label: '4 - Good' },
                    { value: 5, label: '5 - Excellent' }
                ].map((item) => (
                    <FormControlLabel
                        key={item.value}
                        control={<Checkbox checked={rating === item.value} onChange={() => handleRatingChange(item.value)} />}
                        label={item.label}
                    />
                ))}
            </Box>
            <TextField
                label="Review"
                value={reviewtext}
                onChange={(e) => setReviewtext(e.target.value)}
                multiline
                rows={4}
                required
            />
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Thank you for submitting a review!"
            />
        </Box>
    );
}

export default EditReview;