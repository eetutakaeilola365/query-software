package fi.haagahelia.quizzer.domain;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
public interface quizRepository extends CrudRepository <Quiz, Long>{
    List<Quiz> findByName(String name, String description, Boolean published, String date);
}


