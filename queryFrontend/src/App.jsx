//import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar"
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css'; // Global styles

import QuizList from "./Pages/Quizlist"; // Main quizzes list
import Quiz from "./Pages/Quiz";
import CategoryQuizzes from "./Pages/CategoryQuizzes";
import Category from "./Pages/Category"; // Categories page
import Review from "./Pages/Review";
import WriteReview from "./Pages/WriteReview";
import ResultsList from "./Pages/ResultsList";
import EditReview from './Pages/EditReview';

function App() {
  return (
    <Router>
      
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Quizzer
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/categories">Categories</Button>
          </Toolbar>
        </AppBar>
        <Container >
        <Routes>
          <Route path="/quiz/:quizId/results" element={<ResultsList />} />
          <Route path="/" element={<QuizList />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/categories/:id/quizzes" element={<CategoryQuizzes />} />
          <Route path="/quiz/:id/reviews" element={<Review />}/>
          <Route path="/quiz/:quizId/reviews/writereview" element={<WriteReview/>}/>
          <Route path="/quiz/:id/reviews/:reviewid" element={<EditReview/>}/>
        </Routes>
        </Container>
    </Router>
  );
}

export default App;
