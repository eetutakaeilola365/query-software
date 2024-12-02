import { useNavigate } from 'react-router-dom'; // Importing useNavigate
import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import { getCategories } from '../../quizApi';
import QuizList from './Quizlist';

function Category() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}/quizzes`); // Navigate to the quizzes for that category
  };

  const [Categories, setCategories] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "name",
      cellRenderer: params => (
      <span
        style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
        onClick={() => handleCategoryClick(params.data.categoryid)} // Handle category click
      >
        {params.value}
      </span>
    ),},
    { field: "description" },
    {
      cellRenderer: params => <QuizList data={params.data} handleFetch={handleFetch}></QuizList>, width: 120
  },
  ])

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    getCategories()
      .then(data => setCategories(data))
      .catch(error => console.error(error))
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Quizzer</h1>
        <nav>
          <a href="/" style={styles.navLink}>
            Quizzes
          </a>
          <a href="/category" style={styles.navLink}>
            Category
          </a>
        </nav>
      </header>
      <main style={styles.main}>
        <h2 style={styles.title}>Categories</h2>
        <div className="ag-theme-material" style={{height: 500 }}>
          <AgGridReact
            rowData={Categories}
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

export default Category;