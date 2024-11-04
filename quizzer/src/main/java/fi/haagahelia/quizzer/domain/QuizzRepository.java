package fi.haagahelia.quizzer.domain;
import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface QuizzRepository extends CrudRepository <Quiz, Long>{
    List<Quiz> findByName(String name);
}


