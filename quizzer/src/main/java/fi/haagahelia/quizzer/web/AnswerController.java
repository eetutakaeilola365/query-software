package fi.haagahelia.quizzer.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import fi.haagahelia.quizzer.domain.AnsverRepository;
import fi.haagahelia.quizzer.domain.Answer;
import fi.haagahelia.quizzer.domain.QuesitonRepository;
import fi.haagahelia.quizzer.domain.Question;
import fi.haagahelia.quizzer.domain.Quiz;

@Controller
public class AnswerController {

    @Autowired
    private QuesitonRepository qrepository;

    @Autowired
    private AnsverRepository arepository;

    @GetMapping("/{questionId}/answerlist")
	public String getQuestion(@PathVariable("questionId") Long questionId, Model model) {
        Question question = qrepository.findById(questionId).orElse(null);
        if (question != null) {
        model.addAttribute("answers", arepository.findByQuestion(question));
        model.addAttribute("questionId", question);
    }
		return "answerlist";
	}

    @RequestMapping(value = "/{questionId}/addanswer")
    public String addquestion(@PathVariable("questionId") Long questionId, Model model){
        model.addAttribute("answer", new Answer());
        model.addAttribute("questionId", questionId);
        return "addanswer";
    }
    
}
