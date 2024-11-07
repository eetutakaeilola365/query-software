package fi.haagahelia.quizzer.domain;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuesitonRepository extends CrudRepository <Question, Long>{
    List<Question> findByName(String name);
}
