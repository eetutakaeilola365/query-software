import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function Results() {
  const { quizId } = useParams(); // Get quiz ID from URL params
  const [results, setResults] = useState(null);

  // Fetch quiz data
  useEffect(() => {
    fetch(`/api/quizzes/${quizId}`)
      .then((response) => response.json())
      .then((data) => processResults(data))
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, [quizId]);

  const processResults = (quizData) => {
    const processedQuestions = quizData.questions.map((question) => {
      const totalAnswers = question.answers.reduce(
        (sum, answer) => sum + (answer.submissions ? answer.submissions.length : 0),
        0
      );
      const correctAnswers = question.answers
        .filter((answer) => answer.correct)
        .reduce((sum, answer) => sum + (answer.submissions ? answer.submissions.length : 0), 0);
      const wrongAnswers = totalAnswers - correctAnswers;
      const correctPercentage = totalAnswers > 0 ? (correctAnswers * 100) / totalAnswers : 0;

      return {
        questionId: question.questionid,
        name: question.name,
        difficulty: question.difficulty,
        totalAnswers,
        correctAnswers,
        wrongAnswers,
        correctPercentage: correctPercentage.toFixed(2),
      };
    });

    setResults({
      quizName: quizData.name,
      totalAnswers: processedQuestions.reduce((sum, q) => sum + q.totalAnswers, 0),
      questions: processedQuestions,
    });
  };

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Quizzer</h1>
        <nav>
          <a href="/" style={styles.navLink}>
            Quizzes
          </a>
        </nav>
      </header>
      <main style={styles.main}>
        <h2 style={styles.title}>Results of {results.quizName}</h2>
        <p>{results.totalAnswers} answers to {results.questions.length} questions</p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Question</th>
              <th>Difficulty</th>
              <th>Total answers</th>
              <th>Correct answer %</th>
              <th>Correct answers</th>
              <th>Wrong answers</th>
            </tr>
          </thead>
          <tbody>
            {results.questions.map((question) => (
              <tr key={question.questionId}>
                <td>{question.name}</td>
                <td>{question.difficulty}</td>
                <td>{question.totalAnswers}</td>
                <td>{question.correctPercentage}%</td>
                <td>{question.correctAnswers}</td>
                <td>{question.wrongAnswers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  header: {
    backgroundColor: "#1976d2",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  logo: {
    margin: 0,
    fontSize: "1.5em",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    marginRight: "20px",
  },
  main: {
    padding: "20px",
  },
  title: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    textAlign: "left",
  },
};

export default Results;