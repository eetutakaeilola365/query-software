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
public class QuizRestControllerQuizTest {
    @Autowired
    QuizzRepository quizRepo;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() throws Exception {
        quizRepo.deleteAll();
    }

    @Test
    public void getAllPublishedQuizzesReturnsEmptyListWhenNoQuizzesExist() throws Exception {
        this.mockMvc.perform(get("/api/quizzes"))

                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void getAllQuizzesReturnsListOfQuizzesWhenPublishedQuizzesExist() throws Exception {
        Quiz quiz1 = new Quiz(null, "Quiz1", "First quiz", true, LocalDate.now(), null);
        Quiz quiz2 = new Quiz(null, "Quiz2", "Second quiz", true, LocalDate.now(), null);
        quizRepo.save(quiz1);
        quizRepo.save(quiz2);

        this.mockMvc.perform(get("/api/quizzes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("Quiz1"))
                .andExpect(jsonPath("$[1].name").value("Quiz2"));

    }

    @Test
    public void getAllQuizzesDoesNotReturnUnpublishedQuizzes() throws Exception {
        Quiz publishedQuiz = new Quiz(null, "Published Quiz", "This is published", true, LocalDate.now(), null);
        Quiz publishedQuiz2 = new Quiz(null, "Published Quiz 2", "This is published", true, LocalDate.now(), null);
        Quiz unpublishedQuiz = new Quiz(null, "Unpublished Quiz", "This is not published", false, LocalDate.now(),
                null);
        Quiz unpublishedQuiz2 = new Quiz(null, "Unpublished Quiz 2", "This is not published", false, LocalDate.now(),
                null);
        quizRepo.saveAll(List.of(publishedQuiz, publishedQuiz2, unpublishedQuiz, unpublishedQuiz2));

        this.mockMvc.perform(get("/api/quizzes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("Published Quiz"))
                .andExpect(jsonPath("$[1].name").value("Published Quiz 2"));
    }

}
