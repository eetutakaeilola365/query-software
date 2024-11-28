
import QuizList from "./Pages/Quizlist"; // Main quizzes list
import Quiz from "./Pages/Quiz"; 
import { Container } from "@mui/material";
import Category from "./Pages/Category"; // Categories page
import { Routes, BrowserRouter, Route } from "react-router-dom";
import './App.css'; // Global styles

function App() {
  return (
    <BrowserRouter>
    <Container maxWidth="xl">
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/category" element={<Category />} />
      </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
