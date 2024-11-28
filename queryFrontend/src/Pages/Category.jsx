import { Link, useNavigate } from "react-router-dom";
import './category.css';

const Category = () => {
  const navigate = useNavigate();
  return (
    <div className="category-list">
      <header className="category-header">
        <h1>Categories</h1>
      </header>
      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Category.length > 0 ? (
            Category.map((category) => (
              <tr key={category.id}>
                <td>
                  <Link to={`/category/${category.id}`} className="category-link">
                    {category.name}
                  </Link>
                </td>
                <td>{category.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="no-data">
                No categories available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => navigate("/")} className="back-button">
        Back to Quizzes
      </button>
    </div>
  );
};

export default Category;