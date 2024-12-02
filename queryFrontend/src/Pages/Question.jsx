import React, { useState, useEffect } from 'react';

const QuizQuestion = ({ questionId }) => {
    const [question, setQuestion] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQuizQuestionsById(questionId)
            .then(data => setQuestion(data))
            .catch(err => setError(err.message));
    }, [questionId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{question.title}</h2>
            <ul>
                {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuizQuestion;