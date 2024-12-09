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
    columnDefs: [
      { field: "questionText", headerName: "Question", flex: 1 },
      { field: "difficulty", headerName: "Difficulty", width: 120 },
      { field: "totalAnswers", headerName: "Total answers", width: 150 },
      {
        headerName: "Correct answer %",
        valueGetter: (params) => {
          const { totalRightAnswers, totalAnswers } = params.data;
          const percent =
            totalAnswers > 0
              ? Math.round((totalRightAnswers / totalAnswers) * 100)
              : 0;
          return percent + "%";
        },
        width: 180,
      },
      { field: "totalRightAnswers", headerName: "Correct answers", width: 150 },
      {
        headerName: "Wrong answers",
        valueGetter: (params) => {
          const { totalAnswers, totalRightAnswers } = params.data;
          return totalAnswers - totalRightAnswers;
        },
        width: 150,
      },
    ],
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
  };

  async function fetchResults() {
    try {
      const quizIdNumber = parseInt(quizId, 10);
      const data = await getQuizSubmissionsById(quizIdNumber);

      // Set results and questions from API response
      setResults({
        quizName: data.quizName,
        questionCount: data.questionCount,
        totalAnswers: data.submissionsCount,
      });

      setQuestions(data.questions); // Assign questions array directly
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }

  useEffect(() => {
    fetchResults();
  }, [quizId]);

  return (
    <>
      <Typography variant="h4">
        Results of "{results.quizName || "Loading..."}"
      </Typography>
      <div>
        {results.totalAnswers || 0} answers to {results.questionCount || 0}{" "}
        questions
      </div>
      <div
        className="ag-theme-material"
        style={{ height: 500, width: "100%", margin: "0 auto" }}
      >
        <AgGridReact
          rowData={questions}
          columnDefs={gridOptions.columnDefs}
          defaultColDef={gridOptions.defaultColDef}
          suppressCellFocus={true}
        />
      </div>
    </>
  );
}

export default ResultsList;
