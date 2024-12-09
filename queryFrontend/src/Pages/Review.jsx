import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuiz, getReviewsByQuizId } from '../../quizApi';

function Review() {
  const { id } = useParams(); // Correct destructuring of the 'id' from URL
  const [quiz, setQuiz] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    handleFetch();
  }, [id]); // Fetch reviews whenever the quiz ID changes

  const handleFetch = () => {
    getReviewsByQuizId(id) // Pass the ID to the API function
      .then(data => setReviews(data))
    getQuiz(id)
    .then(data => setQuiz(data))
    .catch(error => console.error('Error fetching reviews:', error));
    
  };
 return(
    <div>
      <h2>Reviews of Quiz: {quiz ? quiz.name : "Loading..."}</h2>
      <Link to="/writereview">Write your review</Link>
    </div>
  );
}

export default Review;
