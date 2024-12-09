import { getQuiz, postSubmission } from "../../quizApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './Quiz.css'

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    getQuiz(id)
      .then(data => setQuiz(data))
      .catch(err => setError(err.message));
  }, [id]);

  const handleAnswerChange = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    const selectedQuestion = quiz.questions.find(question =>
      question.answers.some(answer => answer.answerid === selectedAnswer)
    );
    const isCorrect = selectedQuestion.answers.find(answer => answer.answerid === selectedAnswer).correct;

    setSnackbarMessage(isCorrect ? 'Correct answer!' : 'Incorrect answer.');
    setSnackbarSeverity(isCorrect ? 'success' : 'error');
    setOpenSnackbar(true);

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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    <div>
      <h1>{quiz.name}</h1>
      <p>{quiz.description}</p>
      <p>Category: {quiz.category.name}</p>
      <p>Date: {quiz.date}</p>
      <Stack>
        {quiz.questions.map((question) => (
          <div key={question.questionid} className="question">
            <Item>
              <h2>{question.name}</h2>
              <p>Difficulty: {question.difficulty}</p>
              <ul>
                {question.answers.map((answer) => (
                  <li key={answer.answerid} className="no-bullets">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedAnswer === answer.answerid}
                        onChange={() => handleAnswerChange(answer.answerid)
                        }
                      />
                      {answer.choice}
                    </label>
                  </li>
                ))}
              </ul>
              <Button variant="contained" color="inherit" onClick={handleSubmit}>Submit</Button>
            </Item>
          </div>
        ))}
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Quiz;