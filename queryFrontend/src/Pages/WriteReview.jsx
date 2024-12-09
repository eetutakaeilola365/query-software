import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { postReview, getReviewsByQuizId } from "../../quizApi";

function WriteReview() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const { id } = useParams(); // Get quiz ID from URL params
  //const [quiz, setQuiz] = useState(null); // State to hold quiz details
  const [review, setReview] = useState([
    {field: "nickname"},
    {field: "rating"},
    {field: "reviewtext"},
]);
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
  const handleSubmit = async() => {
    if (review.nickname && review.rating && review.reviewtext) {
        try {
            const response = await postReview(id, review); // Assuming postReview accepts id and review object
            console.log("Submission successful:", response);
            setError("");
            
          } catch (err) {
            console.error("Submission error:", err);
            setError("Failed to submit the review. Please try again.");
          } 
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
          Nickname:{" "}
          <input
            name="nickname"
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
              name="reviewtext"
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