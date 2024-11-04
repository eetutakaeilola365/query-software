package fi.haagahelia.quizzer.domain;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
public interface QuizzRepository extends CrudRepository <Quiz, Long>{
    List<Quiz> findByName(String name);
}


