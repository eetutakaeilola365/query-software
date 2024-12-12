package fi.haagahelia.quizzer.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.List;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class QuizRestControllerQuestionTest {
    @Autowired
    QuizzRepository quizRepo;

    @Autowired
    QuesitonRepository questionRepo;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() throws Exception {
        quizRepo.deleteAll();
        questionRepo.deleteAll();
    }

    @Test
    public void getQuestionsByQuizIdReturnsEmptyListWhenQuizDoesNotHaveQuestions() throws Exception {
        Quiz quiz = new Quiz(null, "Empty Quiz", "Quiz that's empty", true, LocalDate.now(), null);
        quizRepo.save(quiz);
        this.mockMvc.perform(get("/api/quizzes/" + quiz.getQuizid() + "/questions"))

                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void getQuestionsByQuizIdReturnsListOfQuestionsWhenQuizHasQuestions() throws Exception {
        Quiz quiz = new Quiz(null, "Quiz with q", "This quiz has questions", true, LocalDate.now(), null);
        quizRepo.save(quiz);

        Question q1 = new Question("Q1", "Easy");
        Question q2 = new Question("Q2", "Hard");
        q1.setQuiz(quiz);
        q2.setQuiz(quiz);
        questionRepo.saveAll(List.of(q1, q2));

        this.mockMvc.perform(get("/api/quizzes/" + quiz.getQuizid() + "/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("Q1"))
                .andExpect(jsonPath("$[1].name").value("Q2"))
                .andExpect(jsonPath("$[0].difficulty").value("Easy"))
                .andExpect(jsonPath("$[1].difficulty").value("Hard"));

    }

    @Test
    public void getQuestionsByQuizIdReturnsErrorWhenQuizDoesNotExist() throws Exception {

        this.mockMvc.perform(get("/api/quizzes/69420/questions"))
                .andExpect(status().isNotFound());
    }

}
