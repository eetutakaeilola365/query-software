import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import { getQuizzes } from '../../quizApi';


function QuizList() {
  const navigate = useNavigate();
  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`); // Navigate to the quiz details page
  };


  const handleSeeReviewsClick = (quizId) => {
    navigate(`/quiz/${quizId}/reviews`); // Navigate to the reviews page for the quiz
  };
  
  const handleResultsClick = (quizId) => {
    navigate(`/results/${quizId}`); // Navigate to the results page
  };
  const [quizzes, setQuizzes] = useState([]);
  const [colDefs, setColDefs] = useState([
    {
      field: "name",
      cellRenderer: params => (
        <span
          style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
          onClick={() => handleQuizClick(params.data.quizid)}
        >
          {params.value}
        </span>
      ), // able to go to quiz
    },
    { field: "description", cellStyle: { whiteSpace: 'nowrap' }, 
    flex: 1}, // venyttää fieldiä tarpeeks et koko description mahtuu siihen
    { field: "category.name" },
    { field: "date" },
    {
      headerName: "See Reviews",
      cellRenderer: params => (
        <span
          style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
          onClick={() => handleSeeReviewsClick(params.data.quizid)}
        >
          See Reviews
        </span>
      ),},
    //Tähän results page navigaatio
    //Tähän Review page navigaatio
    {
      headerName: "Results",
      cellRenderer: params => (
        <span
          style={{
            color: "#1976d2",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => handleResultsClick(params.data.quizid)} // Lisää navigointi tulossivulle
        >
          See Results
        </span>
      ),
      width: 120,
    },
  ])


  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    getQuizzes()
      .then(data => setQuizzes(data))
      .catch(error => console.error(error))
  };

  return (
    <div>
      <main>
        <h2>Quizzes</h2>
        <div className="ag-theme-material" style={{ height: 500, maxWidth: 1280, margin: "0 auto" }}>
          <AgGridReact
            rowData={quizzes}
            columnDefs={colDefs}
            pagination={true}
            paginationAutoPageSize={true}
            suppressCellFocus={true}
            
          />
        </div>
      </main>
    </div>
  );
}

export default QuizList;
  