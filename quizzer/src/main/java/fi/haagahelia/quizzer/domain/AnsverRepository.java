package fi.haagahelia.quizzer.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface AnsverRepository extends JpaRepository <Answer, Long> {
    List <Answer> findByQuestion(Question question);
}
