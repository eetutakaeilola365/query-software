package fi.haagahelia.quizzer.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;

import fi.haagahelia.quizzer.domain.AnsverRepository;
import fi.haagahelia.quizzer.domain.Answer;
import fi.haagahelia.quizzer.domain.Category;
import fi.haagahelia.quizzer.domain.CategoryRepository;
import fi.haagahelia.quizzer.domain.QuesitonRepository;
import fi.haagahelia.quizzer.domain.Quiz;
import fi.haagahelia.quizzer.domain.QuizzRepository;
import fi.haagahelia.quizzer.domain.Submission;
import fi.haagahelia.quizzer.domain.SubmissionDto;
import fi.haagahelia.quizzer.domain.SubmissionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import fi.haagahelia.quizzer.domain.Question;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@Tag(name = "Quiz", description = "Operations for managing and accessing quizzes and their categories, questions and answers" )
public class QuizRestController {

    @Autowired
    private QuizzRepository quizRepository;

    @Autowired
    private QuesitonRepository questionRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AnsverRepository answerRepository;


    // Get all published quizzes
    @Operation(
        summary = "Get all quizzes",
        description = "Returns a list of all quizzes"
    )
    @ApiResponses(value={
        @ApiResponse(responseCode = "200", description = "Successful operation")
    })

    @GetMapping("/quizzes")
    public ResponseEntity<List<Quiz>> getAllPublishedQuizzes() {
        List<Quiz> quizzes = quizRepository.findByPublished(true);
        return new ResponseEntity<>(quizzes, HttpStatus.OK); // 200 OK
    }
    @Operation(
        summary = "Get a quiz by id",
        description = "Returns a quiz with the provided id"
    )
    @ApiResponses(value={
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "404", description = "Quiz with the provided id does not exist")
    })
    
    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable("id") Long quizid) {
        Quiz quiz = quizRepository.findById(quizid).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz with the id: " + quizid + " does not exist"));
        return new ResponseEntity<>(quiz, HttpStatus.OK); // 200 OK
    }
    @Operation(
        summary = "Get questions by quiz id",
        description = "Returns a list of questions from a quiz with the provided id"
    )
    @ApiResponses(value={
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "404", description = "Quiz with the provided id does not exist or the quiz has no questions")
    })

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
    @Operation(
        summary = "Get all categories",
        description = "Returns a list of all categories created"
    )
    @ApiResponses(value={
        @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories(){
        List<Category> categories = categoryRepository.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @Operation(
        summary = "Get a category by id",
        description = "Returns a category with the provided id"
    )
    @ApiResponses(value={
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "404", description = "Category with the provided id does not exist")
    })
    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") Long categoryid) {
        Category category = categoryRepository.findById(categoryid).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category with the id: " + categoryid + " does not exist"));
        return new ResponseEntity<>(category, HttpStatus.OK); // 200 OK
    }
    @Operation(
        summary = "Get quizzes by category id",
        description = "Returns a list of quizzes that belong to a category with the provided id"
    )
    @ApiResponses(value={
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "404", description = "Category with the provided id does not exist")
    })
    @GetMapping("/categories/{id}/quizzes")
    public ResponseEntity<List<Quiz>> getPublishedQuizzesByCategory(@PathVariable("id") Long categoryid) {
        Category category = categoryRepository.findById(categoryid).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category with the id: " + categoryid + " does not exist"));

        List<Quiz> publishedQuizzes = quizRepository.findByCategoryAndPublished(category, true);

        return new ResponseEntity<>(publishedQuizzes, HttpStatus.OK); // 200 OK
    }
    @Operation(
        summary = "Get submissions by quiz id",
        description = "Returns a list of submissions from a quiz with the provided id"
    )
    @ApiResponses(value={
        @ApiResponse(responseCode = "200", description = "Successful operation"),
        @ApiResponse(responseCode = "404", description = "Quiz with the provided id does not exist or the quiz has no submissions")
    })
    @GetMapping("/quizzes/{id}/submissions")
    public ResponseEntity<List<Submission>> getQuizSubmissionsById(@PathVariable("id") Long quizid) {
        Quiz quiz = quizRepository.findById(quizid).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz with the provided id does not exist"));
        List<Submission> submissions = submissionRepository.findByAnswerQuestionQuiz(quiz);
        if (submissions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(submissions, HttpStatus.OK);
    }
    @Operation(
        summary = "Get all submissions",
        description = "Returns a list of questions from a quiz with the provided id"
    )
    @ApiResponses(value={
        @ApiResponse(responseCode = "201", description = "Submission created succesfully"),
        @ApiResponse(responseCode = "404", description = "Answer option does not exist")
    })
    @PostMapping("/submissions")
    public ResponseEntity<String> postSubmission(@RequestBody SubmissionDto submission) {
        
        Answer answer= answerRepository.findById(submission.getAnswerOptionId()).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Answer with id " + submission + " does not exist"));
        Submission newSubmission = new Submission();
        newSubmission.setAnswer(answer);
        submissionRepository.save(newSubmission);
        
        
        return ResponseEntity.status(HttpStatus.CREATED).body("Answer submitted successfully");
    }

}
