package fi.haagahelia.quizzer.domain;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QuizzRepository extends JpaRepository <Quiz, Long>{
    List<Quiz> findByName(String name);
    List<Quiz> findByPublished(boolean published);
}


