import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function ResultsList() {
  const { quizId } = useParams(); // Quiz ID from URL
  const [results, setResults] = useState([]);

  // Fetch data from API and process results
  useEffect(() => {
    fetch(`/api/quizzes/${quizId}`)
      .then((response) => response.json())
      .then((data) => processResults(data))
      .catch((error) => console.error("Error fetching quiz results:", error));
  }, [quizId]);

  const processResults = (quizData) => {
    const processedQuestions = quizData.questions.map((question) => {
      const totalAnswers = question.answers.reduce(
        (sum, answer) => sum + (answer.submissions?.length || 0),
        0
      );
      const correctAnswers = question.answers
        .filter((answer) => answer.correct)
        .reduce((sum, answer) => sum + (answer.submissions?.length || 0), 0);
      const wrongAnswers = totalAnswers - correctAnswers;
      const correctPercentage = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

      return {
        question: question.name,
        difficulty: question.difficulty || "Unknown",
        totalAnswers,
        correctPercentage: correctPercentage.toFixed(2),
        correctAnswers,
        wrongAnswers,
      };
    });

    setResults(processedQuestions);
  };

  const colDefs = [
    { field: "question", headerName: "Question", sortable: true, filter: true, flex: 1 },
    { field: "difficulty", headerName: "Difficulty", sortable: true, filter: true, width: 120 },
    { field: "totalAnswers", headerName: "Total Answers", sortable: true, filter: true, width: 150 },
    {
      field: "correctPercentage",
      headerName: "Correct Answer %",
      sortable: true,
      filter: true,
      width: 180,
      valueFormatter: (params) => `${params.value}%`,
    },
    { field: "correctAnswers", headerName: "Correct Answers", sortable: true, width: 150 },
    { field: "wrongAnswers", headerName: "Wrong Answers", sortable: true, width: 150 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Results</h1>
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "500px" }}
      >
        <AgGridReact
          rowData={results}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </div>
  );
}

export default ResultsList;
