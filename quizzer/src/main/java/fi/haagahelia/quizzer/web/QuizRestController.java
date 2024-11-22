package fi.haagahelia.quizzer.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

import fi.haagahelia.quizzer.domain.QuesitonRepository;
import fi.haagahelia.quizzer.domain.Quiz;
import fi.haagahelia.quizzer.domain.QuizzRepository;
import fi.haagahelia.quizzer.domain.Question;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuizRestController {

    @Autowired
    private QuizzRepository quizRepository;

    @Autowired
    private QuesitonRepository questionRepository;

    // Get all published quizzes
    @GetMapping("/quizzes")
    public ResponseEntity<List<Quiz>> getAllPublishedQuizzes() {
        List<Quiz> quizzes = quizRepository.findByPublished(true);
        return new ResponseEntity<>(quizzes, HttpStatus.OK); // 200 OK
    }

    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable("id") Long quizid) {
        Quiz quiz = quizRepository.findById(quizid).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz with the id: " + quizid + " does not exist"));
        return new ResponseEntity<>(quiz, HttpStatus.OK); // 200 OK
    }

    @GetMapping("/quizzes/{id}/questions")
    public ResponseEntity<List<Question>> getQuizQuestionsById(@PathVariable("id") Long quizid) {
        Quiz quiz = getQuizById(quizid).getBody(); // Fetch the quiz object
        if (quiz == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        }
        List<Question> questions = questionRepository.findByQuiz(quiz);
        if (questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 No Content
        }
        return new ResponseEntity<>(questions, HttpStatus.OK); // 200 OK
    }
}
    
