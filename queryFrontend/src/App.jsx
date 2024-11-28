
import QuizList from "./Pages/Quizlist"; // Main quizzes list
import Quiz from "./Pages/Quiz"; 
import Category from "./Pages/Category"; // Categories page
import { Routes, Router, Route } from "react-router-dom";
import './App.css'; // Global styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </Router>
  );
}

export default App;
