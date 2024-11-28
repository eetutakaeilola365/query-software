import './quizlist.css'
import {Link} from "react-router-dom"
const QuizList = () => {
  const quizzes = [
    {
      id: 1,
      name: "The capital cities of Europe",
      description: "Learn the capital cities of the European countries",
      category: "Geography",
      addedOn: "24.11.2023",
    },
    {
      id: 2,
      name: "Finnish vocabulary",
      description: "Learn the most common Finnish words",
      category: "Vocabulary",
      addedOn: "25.11.2023",
    },
  ];
    

  return (
    <div className="quiz-list">
      <header className="quiz-header">
        <h1>Quizzes</h1>
      </header>
      <table className="quiz-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Added on</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>
                <Link to={`/quiz/${quiz.id}`} className="quiz-link">
                  {quiz.name}
                </Link>
                  
                
              </td>
              <td>{quiz.description}</td>
              <td>{quiz.category}</td>
              <td>{quiz.addedOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizList;