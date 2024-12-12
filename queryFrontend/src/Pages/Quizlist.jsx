import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import { getQuizzes } from '../../quizApi';


function QuizList() {
  const navigate = useNavigate();
  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };


  const handleSeeReviewsClick = (quizId) => {
    navigate(`/quiz/${quizId}/reviews`); 
  };
  
  const handleResultsClick = (quizId) => {
    navigate(`/quiz/${quizId}/results`); 
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
      ),flex: 1
    },
    { field: "description", cellStyle: { whiteSpace: 'nowrap' }, flex: 1}, 
    { field: "category.name", flex:1 },
    { field: "date", flex: 1 },
    {
      headerName: "See Reviews",
      cellRenderer: params => (
        <span
          style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
          onClick={() => handleSeeReviewsClick(params.data.quizid)}
        >
          See Reviews
        </span>
      ), flex: 1},
    {
      headerName: "Results",
      cellRenderer: params => (
        <span
          style={{
            color: "#1976d2",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => handleResultsClick(params.data.quizid)} 
        >
          See Results
        </span>
      ),
      width: 120, flex: 1
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
        <p>Take a quiz by clicking its name!</p>
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
  