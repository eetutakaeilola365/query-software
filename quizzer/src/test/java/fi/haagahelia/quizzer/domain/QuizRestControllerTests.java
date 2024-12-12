package fi.haagahelia.quizzer.domain;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

//Our own test cases for 3 different endpoints

@SpringBootTest
@AutoConfigureMockMvc
public class QuizRestControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuizzRepository quizRepository;

    @MockBean
    private ReviewRepository reviewRepository;

    @MockBean
    private SubmissionRepository submissionRepository;

    @MockBean
    private CategoryRepository categoryRepository;

    @Test
    public void getQuizReviewsByIdinvalidIdreturnsNotFound() throws Exception {
        Long quizId = 999L;

        when(quizRepository.findById(quizId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/quizzes/" + quizId + "/reviews"))
               .andExpect(status().isNotFound());
    }

    @Test
    public void getQuizReviewsByIdvalidQuizWithReviewsreturnsReviews() throws Exception {
        Long quizId = 1L;
        Quiz quiz = new Quiz();
        quiz.setQuizid(quizId);
        quiz.setName("Sample Quiz");

        Review review = new Review();
        review.setReviewid(1L);
        review.setNickname("User1");
        review.setRating(5);
        review.setReviewtext("Great quiz!");
        review.setQuiz(quiz);

        when(quizRepository.findById(quizId)).thenReturn(Optional.of(quiz));
        when(reviewRepository.findByQuiz(quiz)).thenReturn(Collections.singletonList(review));

        mockMvc.perform(get("/api/quizzes/" + quizId + "/reviews"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$[0].nickname").value("User1"))
               .andExpect(jsonPath("$[0].rating").value(5));
    }

    @Test
    public void getQuizSubmissionsByIdinvalidIdreturnsNotFound() throws Exception {
        Long quizId = 999L;

        when(quizRepository.findById(quizId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/quizzes/" + quizId + "/submissions"))
               .andExpect(status().isNotFound());
    }

    @Test
    public void getCategoryById_invalidCategory_returnsNotFound() throws Exception {
        Long categoryId = 999L;

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/categories/" + categoryId))
               .andExpect(status().isNotFound());
    }
    
    @Test
    public void getCategoriesvalidRequestreturnsListOfCategories() throws Exception {
        Category category1 = new Category();
        category1.setCategoryid(1L);
        category1.setName("Science");

        Category category2 = new Category();
        category2.setCategoryid(2L);
        category2.setName("Math");

        when(categoryRepository.findAll()).thenReturn(Arrays.asList(category1, category2));

        mockMvc.perform(get("/api/categories"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.length()").value(2)) 
               .andExpect(jsonPath("$[0].categoryid").value(1L)) 
               .andExpect(jsonPath("$[0].name").value("Science")) 
               .andExpect(jsonPath("$[1].categoryid").value(2L)) 
               .andExpect(jsonPath("$[1].name").value("Math")); 
    }

}
