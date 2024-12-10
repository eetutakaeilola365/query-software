import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Checkbox, FormControlLabel, Snackbar, TextField, Typography } from '@mui/material';
import { postReview } from '../../quizApi';
import { getQuiz } from '../../quizApi';
function WriteReview() {
  const { quizId } = useParams();
  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewtext, setReviewtext] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [quiz, setQuiz] = useState('');
  const [error, setError] = useState(null);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  useEffect(() => {
    getQuiz(quizId)
      .then(data => setQuiz(data))
      .catch(err => setError(err.message));
  }, [quizId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const review = { quizId, nickname, rating, reviewtext };
    postReview(review)
      .then(response => {
        setSnackbarOpen(true);
        console.log("Submission successful:", response);
        })
      .catch((error) => {
        console.error('Error submitting review:', error);
        alert('Failed to submit review.');
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" component="h1">Write a Review for "{quiz.name}"</Typography>
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

export default WriteReview;