import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import { getCategories } from '../../quizApi';

function Category() {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}/quizzes`);
  };

  const [Categories, setCategories] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "name",
      cellRenderer: params => (
      <span
        style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
        onClick={() => handleCategoryClick(params.data.categoryid)}
      >
        {params.value}
      </span>
    ),},
    { field: "description", cellStyle: { whiteSpace: 'nowrap' }, 
    flex: 1},
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
    <div>
      <main>
        <h2>Categories</h2>
        <div className="ag-theme-material" style={{height: 500, maxWidth: 1280, margin: "0 auto"}}>
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


export default Category;