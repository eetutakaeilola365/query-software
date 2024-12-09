import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { getQuizSubmissionsById } from "../../quizApi";

function ResultsList() {
  const [results, setResults] = useState({});
  const [questions, setQuestions] = useState([]);
  const { quizId } = useParams();

  const gridOptions = {
    autoSizeStrategy: {
      type: "fitGridWidth",
    },
    columnDefs: [
      { field: "questionText", headerName: "Question", flex: 1 },
      { field: "difficulty", headerName: "Difficulty", width: 120 },
      { field: "totalAnswers", headerName: "Total answers", width: 150 },
      {
        headerName: "Correct answer %",
        valueGetter: function (params) {
          const percent = Math.round(
            (params.data.totalRightAnswers / params.data.totalAnswers) * 100
          );
          return percent + "%";
        },
        width: 180,
      },
      { field: "totalRightAnswers", headerName: "Correct answers", width: 150 },
      {
        headerName: "Wrong answers",
        valueGetter: (p) => p.data.totalAnswers - p.data.totalRightAnswers,
        width: 150,
      },
    ],
  };

  async function fetchResults() {
    try {
      const quizIdNumber = parseInt(quizId, 10);
      const data = await getQuizSubmissionsById(quizIdNumber);

      // Process data into the required format
      setResults({
        totalAnswers: data.totalAnswers,
        totalRightAnswers: data.totalRightAnswers,
        quizId: data.quizId,
        questionCount: data.questionCount,
        quizName: data.quizName,
      });

      setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }

  useEffect(() => {
    fetchResults();
  }, [quizId]);

  return (
    <>
      <Typography variant="h4">Results of "{results.quizName}"</Typography>
      <div>
        {results.totalAnswers} answers to {results.questionCount} questions
      </div>
      <div
        className="ag-theme-material"
        style={{ height: 500, width: "100%", margin: "0 auto" }}
      >
        <AgGridReact
          rowData={questions}
          gridOptions={gridOptions}
          suppressCellFocus={true}
        />
      </div>
    </>
  );
}

export default ResultsList;
