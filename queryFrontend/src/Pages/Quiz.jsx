
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { id } = useParams(); // Get the quiz ID from the URL

  // Mock data for quizzes
  const quizData = {
    1: {
      name: "The capital cities of Europe",
      description: "Learn the capital cities of the European countries",
      addedOn: "24.11.2023",
      category: "Geography",
      questions: [
        {
          text: "What is the capital of Finland?",
          number: 1,
          difficulty: "Easy",
        },
        {
          text: "What is the capital of Sweden?",
          number: 2,
          difficulty: "Hard",
        },
      ],
    },
    2: {
      name: "Finnish vocabulary",
      description: "Learn the most common Finnish words",
      addedOn: "25.11.2023",
      category: "Vocabulary",
      questions: [],
    },
  };

  const quiz = quizData[id];

  if (!quiz) {
    return <h2>Quiz not found</h2>;
  }

  return (
    <div>
      <header className="quiz-header">
        <h1>{quiz.name}</h1>
        <p>{quiz.description}</p>
        <p>
          Added on: {quiz.addedOn} - Questions: {quiz.questions.length} - Category: {quiz.category}
        </p>
      </header>
      {quiz.questions.length > 0 ? (
        <div>
          {quiz.questions.map((q) => (
            <div key={q.number} className="question-card">
              <h3>{q.text}</h3>
              <p>
                Question {q.number} of {quiz.questions.length} - Difficulty: {q.difficulty}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
    </div>
  );
};

export default Quiz;