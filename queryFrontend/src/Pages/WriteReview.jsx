import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { postSubmission, getReviewsByQuizId } from "../../quizApi";

function WriteReview() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const { id } = useParams(); // Get quiz ID from URL params
  //const [quiz, setQuiz] = useState(null); // State to hold quiz details
  const [review, setReview] = useState({
    username: "",
    rating: "2",
    text: "",
  });
  const [error, setError] = useState(""); // State for error messages

  // Fetch quiz details when the component mounts
  useEffect(() => {
    async function fetchReviewData() {
      try {
        const reviewData = await getReviewsByQuizId(id);
        setReview(reviewData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }

    fetchReviewData();
  }, [id]);
  const handleSubmit = () => {
    if (getReviewsByQuizId) {
      postSubmission(getReviewsByQuizId)
        .then(response => {
          console.log("Submission successful:", response);
        })
        .catch(err => {
          console.error("Submission error:", err);
          setError(err.message);
        });
    } else {
      setError("Please select an answer before submitting.");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  // Handle form submission

  if (!review) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <header>
        <h1>{review.name}</h1>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <p>{formattedDate}</p>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </main>
  );
}

export default WriteReview;