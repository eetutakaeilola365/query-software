import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getPublishedQuizzesByCategory, getCategory } from "../../quizApi";

function CategoryQuizzes() {
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

    const { id } = useParams();
    const [category, setCategory] = useState(null);
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
      ]);


    useEffect(() => {
        handleFetch();
    }, [id]);

    const handleFetch = () => {
        getCategory(id)
            .then(data => setCategory(data));
        getPublishedQuizzesByCategory(id)
            .then(data => setQuizzes(data));
    };

    if (!category) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <main>
                <h2 >{category.name}</h2>
                <p>{category.description}</p>
                <p>Click the name of the quiz to take it!</p>
                <div className="ag-theme-material" style={{ height: 460, maxWidth: 1280, margin: "0 auto" }}>
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


export default CategoryQuizzes;
