
import QuizList from "./Pages/Quizlist"; // Main quizzes list
import Quiz from "./Pages/Quiz"; 
import { Container } from "@mui/material";
import CategoryQuizzes from "./Pages/CategoryQuizzes";
import Category from "./Pages/Category"; // Categories page
import { Routes, BrowserRouter, Route } from "react-router-dom";
import './App.css'; // Global styles
import Results from "./Pages/Results";

function App() {
  return (
    <BrowserRouter>

    <Container maxWidth="xl">
      <Routes>
        <Route path="/results" element={<Results />} />
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:id/quizzes" element={<CategoryQuizzes />} /> 
      </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
