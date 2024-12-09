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
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.logo}>Quizzer</h1>
                <nav>
                    <a href="/" style={styles.navLink}>
                        Quizzes
                    </a>
                    <a href="/category" style={styles.navLink}>
                        Categories
                    </a>
                </nav>
            </header>
            <main style={styles.main}>
                <h2 style={styles.title}>{category.name}</h2>
                <p>{category.description}</p>
                <div className="ag-theme-material" style={{ height: 460, width: 1000, margin: "0 auto" }}>
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



export default CategoryQuizzes;
