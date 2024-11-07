package fi.haagahelia.quizzer.web;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import fi.haagahelia.quizzer.domain.QuesitonRepository;

import fi.haagahelia.quizzer.domain.Quiz;
import fi.haagahelia.quizzer.domain.QuizzRepository;
import fi.haagahelia.quizzer.domain.Answer;
import fi.haagahelia.quizzer.domain.Question;

@Controller
public class QuestionController {

    @Autowired private QuesitonRepository questionrepository;

    @Autowired private QuizzRepository quizrepository;

	@GetMapping("/{id}/questionlist")
	public String getQuestion(Model model) {
        model.addAttribute("questions", questionrepository.findAll());
		return "questionlist";
	}
    @RequestMapping(value = "/addquestion")
    public String addquestion(Model model){
        model.addAttribute("question", new Question());
        return "addquestion";
    }
    @RequestMapping(value = "/savequestion", method = RequestMethod.POST)
    public String savequestion() {
        return "quizlist"; 
    }
}
