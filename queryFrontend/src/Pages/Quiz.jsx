
import { useParams } from "react-router-dom";
import {useState, useEffect } from 'react'
function Quiz(){
  const { quizId } = useParams(); // Get quizId from URL
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  // Fetch quiz data from backend
  useEffect(() => {
    fetch(`/api/quizzes/${quizId}`)
      .then((response) => response.json())
      .then((data) => setQuiz(data))
      .catch((error) => console.error("Error fetching quiz:", error));
  }, [quizId]);

  const handleAnswerSubmit = (questionId, answerOptionId) => {
    // Submit the selected answer to the backend
    fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answerOptionId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedback((prev) => ({
          ...prev,
          [questionId]: data.correct
            ? "That is correct, good job!"
            : "That is not correct, try again",
        }));
        setUserAnswers((prev) => ({
          ...prev,
          [questionId]: answerOptionId,
        }));
      })
      .catch((error) => console.error("Error submitting answer:", error));
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>{quiz.name}</h1>
      <p>{quiz.description}</p>
      <p>
        Added on: {quiz.date} - Questions: {quiz.questions.length} - Category:{" "}
        {quiz.category?.name || "N/A"}
      </p>

      {quiz.questions.map((question) => (
        <div key={question.questionid} style={styles.questionCard}>
          <h3>
            {question.name}{" "}
            <small>(Difficulty: {question.difficulty || "Unknown"})</small>
          </h3>
          {question.answers.map((answer) => (
            <div key={answer.answerid} style={styles.option}>
              <input
                type="radio"
                id={`q${question.questionid}-a${answer.answerid}`}
                name={`question-${question.questionid}`}
                value={answer.answerid}
                checked={userAnswers[question.questionid] === answer.answerid}
                onChange={() => handleAnswerSubmit(question.questionid, answer.answerid)}
              />
              <label
                htmlFor={`q${question.questionid}-a${answer.answerid}`}
                style={styles.label}
              >
                {answer.choice}
              </label>
            </div>
          ))}
          {feedback[question.questionid] && (
            <div style={styles.feedback}>
              {feedback[question.questionid]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  questionCard: {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  option: {
    marginBottom: "10px",
  },
  label: {
    marginLeft: "8px",
    fontSize: "16px",
  },
  feedback: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "4px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#1976d2",
  },
};

export default Quiz;