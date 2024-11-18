package fi.haagahelia.quizzer.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;
import fi.haagahelia.quizzer.domain.Quiz;
import fi.haagahelia.quizzer.domain.QuizzRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")

public class QuizRestController {
    @Autowired
    private QuizzRepository quizRepository;

    // Get all quizzes
    @GetMapping("/quizzes")
    public List<Quiz> getAllPublishedQuizzes() {
        return quizRepository.findByPublished(true);
    }
}
