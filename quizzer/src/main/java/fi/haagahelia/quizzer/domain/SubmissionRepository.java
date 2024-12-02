package fi.haagahelia.quizzer.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionRepository extends JpaRepository <Submission, Long>{
List<Submission> findByAnswer(Answer answer);
List<Submission> findByAnswerQuestionQuiz(Quiz quiz);

}
