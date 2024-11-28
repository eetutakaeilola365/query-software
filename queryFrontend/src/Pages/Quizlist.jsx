import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import { Link } from "react-router-dom"
import { getQuizzes } from '../../quizApi';

function QuizList() {

  const [quizzes, setQuizzes] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "name" },
    { field: "description" },
    { field: "published" },
    { field: "date" },
    {
      cellRenderer: params => <EditCustomer data={params.data} handleFetch={handleFetch}></EditCustomer>, width: 120
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
    <>
      <div className="ag-theme-material" // applying the Data Grid theme
                style={{ height: 500 }}>

        <AgGridReact
          rowData={quizzes}
          columnDefs={colDefs}
          pagination={true} // makes the list fit to page with pagination
          paginationAutoPageSize={true} // automaticly selects the size how many rows on a pagination page
          suppressCellFocus={true} // deletes cell highlight when clicking any cell in agGrid
        />
      </div>
    </>
  );
};

export default QuizList;