import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, getReviewsByQuizId } from "../../quizApi";

function WriteReview() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const { id } = useParams(); // Get quiz ID from URL params
    const [quiz, setQuiz] = useState(null); // State to hold quiz details
    const [review, setReviewsByQuizId] = useState({
        username: "",
        rating: "2",
        text: "",
    });

    useEffect(() => {
        async function fetchQuizData() {
        try {
            const quizData = await getQuiz(id);
            setQuiz(quizData);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
        }

    fetchQuizData();
  }, [id]);
  const handleFetch = () => {
    getReviewsByQuizId(id) // Pass the ID to the API function
      .then(data => setReviewsByQuizId(data))
    getQuiz(id)
    .then(data => setQuiz(data))
    .catch(error => console.error('Error fetching reviews:', error));
    
  };
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Logic to submit review goes here
    console.log("Submitted Review:", review);
  };

  if (!quiz) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <header>
        <h1>{quiz.name}</h1>
      </header>
      <div>
        <label>
          Username:{" "}
          <input
            name="username"
            value={review.username}
            onChange={handleInputChange}
          />
        </label>
        <p>
          <p>Rating:</p>
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="rating"
                value={value}
                checked={review.rating === String(value)}
                onChange={handleInputChange}
              />
              {value}
            </label>
          ))}
        </p>
        <p>
          <label>
            Write your review:{" "}
            <input
              type="text"
              name="text"
              value={review.text}
              onChange={handleInputChange}
            />
          </label>
        </p>
        <div>
          <p>{formattedDate}</p>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </main>
  );
}

export default WriteReview;