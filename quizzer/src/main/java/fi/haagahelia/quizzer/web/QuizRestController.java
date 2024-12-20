package fi.haagahelia.quizzer.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import fi.haagahelia.quizzer.domain.AnsverRepository;
import fi.haagahelia.quizzer.domain.Answer;
import fi.haagahelia.quizzer.domain.Category;
import fi.haagahelia.quizzer.domain.CategoryRepository;
import fi.haagahelia.quizzer.domain.QuesitonRepository;
import fi.haagahelia.quizzer.domain.Quiz;
import fi.haagahelia.quizzer.domain.QuizzRepository;
import fi.haagahelia.quizzer.domain.Review;
import fi.haagahelia.quizzer.domain.Submission;
import fi.haagahelia.quizzer.domain.SubmissionDto;
import fi.haagahelia.quizzer.domain.SubmissionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import fi.haagahelia.quizzer.domain.Question;
import org.springframework.web.bind.annotation.RequestParam;
import fi.haagahelia.quizzer.domain.ReviewRepository;
import fi.haagahelia.quizzer.domain.ReviewDto;
import fi.haagahelia.quizzer.domain.SubmissionService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@Tag(name = "Quiz", description = "Operations for managing and accessing quizzes and their categories, questions and answers")
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

        @Autowired
        private ReviewRepository reviewRepository;

        @Autowired
        private SubmissionService submissionService;

        // Get all published quizzes
        @Operation(summary = "Get all quizzes", description = "Returns a list of all quizzes")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation")
        })

        @GetMapping("/quizzes")
        public ResponseEntity<List<Quiz>> getAllPublishedQuizzes() {
                List<Quiz> quizzes = quizRepository.findByPublished(true);
                return new ResponseEntity<>(quizzes, HttpStatus.OK); // 200 OK
        }

        @Operation(summary = "Get a quiz by id", description = "Returns a quiz with the provided id")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation"),
                        @ApiResponse(responseCode = "404", description = "Quiz with the provided id does not exist")
        })

        @GetMapping("/quizzes/{id}")
        public ResponseEntity<Quiz> getQuizById(@PathVariable("id") Long quizid) {
                Quiz quiz = quizRepository.findById(quizid).orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Quiz with the id: " + quizid + " does not exist"));
                return new ResponseEntity<>(quiz, HttpStatus.OK); // 200 OK
        }

        @Operation(summary = "Get questions by quiz id", description = "Returns a list of questions from a quiz with the provided id")
        @ApiResponses(value = {
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
                return new ResponseEntity<>(questions, HttpStatus.OK); // 200 OK
        }

        @Operation(summary = "Get all categories", description = "Returns a list of all categories created")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation")
        })
        @GetMapping("/categories")
        public ResponseEntity<List<Category>> getCategories() {
                List<Category> categories = categoryRepository.findAll();
                return new ResponseEntity<>(categories, HttpStatus.OK);
        }

        @Operation(summary = "Get a category by id", description = "Returns a category with the provided id")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation"),
                        @ApiResponse(responseCode = "404", description = "Category with the provided id does not exist")
        })
        @GetMapping("/categories/{id}")
        public ResponseEntity<Category> getCategoryById(@PathVariable("id") Long categoryid) {
                Category category = categoryRepository.findById(categoryid).orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Category with the id: " + categoryid + " does not exist"));
                return new ResponseEntity<>(category, HttpStatus.OK); // 200 OK
        }

        @Operation(summary = "Get quizzes by category id", description = "Returns a list of quizzes that belong to a category with the provided id")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation"),
                        @ApiResponse(responseCode = "404", description = "Category with the provided id does not exist")
        })

        @GetMapping("/categories/{id}/quizzes")
        public ResponseEntity<List<Quiz>> getPublishedQuizzesByCategory(@PathVariable("id") Long categoryid) {
                Category category = categoryRepository.findById(categoryid).orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Category with the id: " + categoryid + " does not exist"));

                List<Quiz> publishedQuizzes = quizRepository.findByCategoryAndPublished(category, true);

                return new ResponseEntity<>(publishedQuizzes, HttpStatus.OK); // 200 OK
        }

        @Operation(summary = "Get submissions by quiz id", description = "Returns a list of submissions from a quiz with the provided id")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation"),
                        @ApiResponse(responseCode = "404", description = "Quiz with the provided id does not exist or the quiz has no submissions")
        })

        @GetMapping("/quizzes/{id}/submissions")
        public ResponseEntity<List<Submission>> getQuizSubmissionsById(@PathVariable("id") Long quizid) {
                Quiz quiz = quizRepository.findById(quizid).orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Quiz with the provided id does not exist"));
                List<Submission> submissions = submissionRepository.findByAnswerQuestionQuiz(quiz);
                if (submissions.isEmpty()) {
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
                return new ResponseEntity<>(submissions, HttpStatus.OK);
        }

        @Operation(summary = "Create a new submission", description = "Creates a new submission with the provided answer option id")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Submission created succesfully"),
                        @ApiResponse(responseCode = "404", description = "Answer option with the provided id does not exist"),
                        @ApiResponse(responseCode = "400", description = "Answer option id cannot be null"),
                        @ApiResponse(responseCode = "403", description = "Quiz is not published")
        })

        @PostMapping("/submissions")
        public ResponseEntity<?> postSubmission(@Valid @RequestBody SubmissionDto submission) {

                if (submission.getAnswerOptionId() == null) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Answer option id cannot be null");
                }

                Answer answer = answerRepository.findById(submission.getAnswerOptionId()).orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Answer with id " + submission + " does not exist"));

                Question question = answer.getQuestion();
                Quiz quiz = question.getQuiz();
                if (quiz != null && !quiz.getPublished()) {
                        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Quiz is not published");
                }
                Submission newSubmission = new Submission();
                newSubmission.setAnswer(answer);
                submissionRepository.save(newSubmission);

                return ResponseEntity.status(HttpStatus.CREATED).body(newSubmission);
        }

        @Operation(summary = "Get reviews by quiz id", description = "Returns a list of reviews for a quiz with the provided quiz id")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation"),
                        @ApiResponse(responseCode = "404", description = "Quiz with the provided id does not exist")
        })

        @GetMapping("/quizzes/{Id}/reviews")
        public ResponseEntity<List<Review>> getQuizReviewsById(@PathVariable("Id") Long quizId) {
                Quiz quiz = quizRepository.findById(quizId).orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Quiz with the id: " + quizId + " does not exist"));
                List<Review> reviews = reviewRepository.findByQuiz(quiz);
                return new ResponseEntity<>(reviews, HttpStatus.OK); // 200 OK
        }

        @Operation(summary = "Get review by id", description = "Returns a review with the provided id")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation"),
                        @ApiResponse(responseCode = "404", description = "Review with the provided id does not exist")
        })

        @GetMapping("/reviews/{id}")
        public ResponseEntity<Review> getReviewById(@PathVariable("id") Long reviewId) {
                Review review = reviewRepository.findById(reviewId).orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Review with id " + reviewId + " does not exist"));
                return new ResponseEntity<>(review, HttpStatus.OK); // 200 OK
        }

        @Operation(summary = "Create review", description = "Create a review for a quiz")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Review created successfully"),
                        @ApiResponse(responseCode = "404", description = "Quiz with the provided id does not exist"),
                        @ApiResponse(responseCode = "403", description = "Quiz not published")
        })

        @PostMapping("/reviews")
        public ResponseEntity<?> postReviews(@RequestBody ReviewDto review) {
                Quiz quiz = quizRepository.findById(review.getQuizId()).orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Quiz with id " + review.getQuizId() + " does not exist"));

                if (!quiz.getPublished()) {
                        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Quiz not published");
                }

                else {
                        Review newReview = new Review();
                        newReview.setQuiz(quiz);
                        newReview.setRating(review.getRating());
                        newReview.setReviewtext(review.getReviewtext());
                        newReview.setNickname(review.getNickname());
                        reviewRepository.save(newReview);

                        return ResponseEntity.status(HttpStatus.CREATED).body(newReview);
                }

        }

        @Operation(summary = "Update review", description = "Updates review with the provided id")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation"),
                        @ApiResponse(responseCode = "404", description = "Review with the provided id does not exist")
        })

        @PutMapping("/reviews/{id}")
        public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody ReviewDto reviewDto) {
                Review review = reviewRepository.findById(id).orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Review with id " + id + " does not exist"));

                review.setNickname(reviewDto.getNickname());
                review.setRating(reviewDto.getRating());
                review.setReviewtext(reviewDto.getReviewtext());
                reviewRepository.save(review);

                return ResponseEntity.ok(review);
        }

        @Operation(summary = "Get results for a quiz", description = "Returns total answers and total right answers for a quiz")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successful operation"),
                        @ApiResponse(responseCode = "404", description = "Quiz with the provided id not found")
        })

        @GetMapping("/seeresults/{quizId}")
        @ResponseBody
        public Map<String, Object> getQuizResults(@PathVariable Long quizId) {

                Quiz quiz = quizRepository.findById(quizId)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found"));

                List<Question> questions = questionRepository.findByQuiz(quiz);
                List<Submission> submissions = submissionRepository.findByAnswerQuestionQuiz(quiz);

                List<Map<String, Object>> questionDetails = questions.stream()
                                .map(question -> {
                                        Map<String, Object> questionMap = Map.of(
                                                        "questionText", question.getName(),
                                                        "difficulty", question.getDifficulty(),
                                                        "totalAnswers",
                                                        submissionRepository.findByAnswerQuestion(question).size(),
                                                        "totalRightAnswers",
                                                        submissionService.countCorrectAnswers(submissionRepository
                                                                        .findByAnswerQuestion(question)));
                                        return questionMap;
                                })
                                .toList();

                return Map.of(
                                "quizName", quiz.getName(),
                                "questionCount", questions.size(),
                                "submissionsCount", submissions.size(),
                                "questions", questionDetails);
        }

        @Operation(summary = "Update review", description = "Deletes review with the provided id")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Successful operation"),
                        @ApiResponse(responseCode = "404", description = "Review with the provided id does not exist")
        })

        @DeleteMapping("/reviews/{Id}")
        public ResponseEntity<Void> deleteReview(@PathVariable("Id") Long reviewId) {
                Review review = reviewRepository.findById(reviewId)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Review with id " + reviewId + " does not exist"));

                reviewRepository.delete(review);
                return ResponseEntity.noContent().build(); // 204 No Content
        }
};