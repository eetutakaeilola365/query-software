package fi.haagahelia.quizzer.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface AnsverRepository extends CrudRepository <Answer, Long> {
    List <Answer> findfindByQuestion(Question question);
}
