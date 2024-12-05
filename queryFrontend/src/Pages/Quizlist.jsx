import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import { getQuizzes } from '../../quizApi';


function QuizList() {
  const navigate = useNavigate();
  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`); // Navigate to the quiz details page
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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Quizzer</h1>
        <nav>
          <a href="#" style={styles.navLink}>
            Quizzes
          </a>
          <a href="/category" style={styles.navLink}>
            Categories
          </a>
        </nav>
      </header>
      <main style={styles.main}>
        <h2 style={styles.title}>Quizzes</h2>
        <div className="ag-theme-material" style={{ height: 500, width: 1000, margin: "0 auto" }}>
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
  resultsLink: {
    color: "#1976d2",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default QuizList;
  