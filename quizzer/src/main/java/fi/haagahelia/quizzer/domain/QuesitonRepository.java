package fi.haagahelia.quizzer.domain;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuesitonRepository extends JpaRepository <Question, Long>{
    List<Question> findByQuiz(Quiz quiz);
}
