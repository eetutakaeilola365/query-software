
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import fi.haagahelia.quizzer.domain.Quiz;
import fi.haagahelia.quizzer.domain.Answer;
import fi.haagahelia.quizzer.domain.Question;
@RestController
@ResponseBody
public class controller {

    @GetMapping("/quiz")
	public Iterable<Quiz> getQuiz() {
		return quizRepository.findAll();
	}
}
