
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizList from './Pages/quizlist';
import Quiz from "./Pages/Quiz";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />}/>
      </Routes>
    </Router>
     
      
    
  )
}

export default App
