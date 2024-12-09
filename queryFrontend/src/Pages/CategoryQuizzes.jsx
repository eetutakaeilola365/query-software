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
        navigate(`/quiz/${quizId}/reviews`); // Navigate to the reviews page for the quiz
    };
    const handleResultsClick = (quizId) => {
        navigate(`/results/${quizId}`); // Navigate to the results page
      };

    const { id } = useParams(); //category id url: stä

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
            )
        },
        {
            field: "description", headerName: "Description", cellStyle: { whiteSpace: 'nowrap' },
            flex: 1 // venyttää fieldiä tarpeeks et koko description mahtuu siihen
        },
        { field: "date", headerName: "Added on " },
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
