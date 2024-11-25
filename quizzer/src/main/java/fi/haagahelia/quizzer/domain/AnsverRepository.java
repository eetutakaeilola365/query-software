package fi.haagahelia.quizzer.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnsverRepository extends JpaRepository <Answer, Long> {
    List <Answer> findByQuestion(Question question);
}
