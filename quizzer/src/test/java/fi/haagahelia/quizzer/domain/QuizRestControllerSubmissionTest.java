package fi.haagahelia.quizzer.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
public class QuizRestControllerSubmissionTest {
    @Autowired
    QuizzRepository quizRepo;

    @Autowired
    QuesitonRepository questionRepo;

    @Autowired
    AnsverRepository answerRepo;

    @Autowired
    SubmissionRepository submissionRepo;

    @Autowired
    private MockMvc mockMvc;

    ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setUp() throws Exception {
        quizRepo.deleteAll();
        questionRepo.deleteAll();
        answerRepo.deleteAll();
        submissionRepo.deleteAll();
    }

    @Test
    public void createAnswerSavesAnswerForPublishedQuiz() throws Exception {
        Quiz quiz = new Quiz(null, "Published Quiz", "A quiz", true, null, null);
        quizRepo.save(quiz);

        Question question = new Question("Question 1", "Easy");
        question.setQuiz(quiz);
        questionRepo.save(question);

        Answer answer = new Answer("Answer Option 1", true);
        answer.setQuestion(question);
        answerRepo.save(answer);

        SubmissionDto submissiondto = new SubmissionDto();
        SubmissionDto submissiondto2 = new SubmissionDto();
        submissiondto.setAnswerOptionId(answer.getAnswerid());
        submissiondto2.setAnswerOptionId(answer.getAnswerid());
        String requestBody = mapper.writeValueAsString(submissiondto2);

        this.mockMvc.perform(post("/api/submissions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.submissionid").value(answer.getAnswerid()));

        List<Submission> submissions = submissionRepo.findAll();
        assertEquals(1, submissions.size());

        Submission savedSubmission = submissions.get(0);
        assertEquals(answer.getAnswerid(), savedSubmission.getAnswer().getAnswerid());
    }

    @Test
    public void createAnswerDoesNotSaveAnswerWithoutAnswerOption() throws Exception {
        this.mockMvc.perform(post("/api/submissions")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"answerOptionId\": null }"))
                .andExpect(status().isBadRequest());

        assertEquals(0, submissionRepo.count());
    }

    @Test
    public void createAnswerDoesNotSaveAnswerForNonExistingAnswerOption() throws Exception {
        this.mockMvc.perform(post("/api/submissions")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"answerOptionId\": 1 }"))
                .andExpect(status().isNotFound());

        assertEquals(0, submissionRepo.count());
    }

    @Test
    public void createAnswerDoesNotSaveAnswerForNonPublishedQuiz() throws Exception {
        Quiz quiz = new Quiz(null, "Non-Published Quiz", "A quiz", false, null, null);
        quizRepo.save(quiz);

        Question question = new Question("Question 1", "Easy");
        question.setQuiz(quiz);
        questionRepo.save(question);

        Answer answer = new Answer("Answer Option 1", true);
        answer.setQuestion(question);
        answerRepo.save(answer);

        SubmissionDto submissiondto = new SubmissionDto();
        submissiondto.setAnswerOptionId(answer.getAnswerid());
        String requestBody = mapper.writeValueAsString(submissiondto);

        this.mockMvc.perform(post("/api/submissions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isForbidden());

        List<Submission> submissions = submissionRepo.findAll();
        assertEquals(0, submissions.size());
    }

}
