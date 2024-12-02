import React, { useState, useEffect } from 'react';
import { getQuizQuestionsById, postSubmission } from '../../quizApi';

function Quiz({ questionId }){
    const [questions, setQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQuiz(questionId)
            .then(data => setQuestions(data))
            .catch(err => setError(err.message));
    }, [questionId]);

    const handleAnswerChange = (answerId) => {
        setSelectedAnswer(answerId);
    };

    const handleSubmit = () => {
        if (selectedAnswer) {
            postSubmission({ answerOptionId: selectedAnswer })
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

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {questions.map((question) => (
                <div key={question.questionid}>
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
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Quiz;