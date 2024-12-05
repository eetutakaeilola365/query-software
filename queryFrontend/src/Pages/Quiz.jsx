import { getQuiz, postSubmission } from "../../quizApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQuiz(id)
      .then(data => setQuiz(data))
      .catch(err => setError(err.message));
  }, [id]);

  const handleAnswerChange = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      postSubmission(selectedAnswer)
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h1>{quiz.name}</h1>
        <p>{quiz.description}</p>
        <p>Category: {quiz.category.name}</p>
        <p>Date: {quiz.date}</p>
        {quiz.questions.map((question) => (
          <div key={question.questionid} class="question">
            <h2>{question.name}</h2>
            <p>Difficulty: {question.difficulty}</p>
            <ul>
              {question.answers.map((answer) => (
                <li key={answer.answerid}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedAnswer === answer.answerid}
                      onChange={() => handleAnswerChange(answer.answerid)}
                    />
                    {answer.choice}
                  </label>
                </li>
              ))}
            </ul>
            <Button variant="contained" color="inherit" onClick={handleSubmit}>Submit</Button>
          </div>
        ))}
    </div>
  );
}

export default Quiz;