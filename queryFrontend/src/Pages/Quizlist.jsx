import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import { getQuizzes } from '../../quizApi';


function QuizList() {
  const navigate = useNavigate();
        /*Pääsee results pagelle. Täytyy jotenkin laittaa se linkki samalle tasolle kun tuo alla oleva olio 
    const handleResults = (Results) => {
        navigate(`/results${Results}`);
      };*/
  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`); // Navigate to the quiz details page
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
    
    
    //Tähän results page navigaatio
    //Tähän Review page navigaatio
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
  