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

	@GetMapping("/{quizId}/questionlist")
	public String getQuestion(@PathVariable("quizId") Long quizId, Model model) {
        Quiz quiz = quizrepository.findById(quizId).orElse(null);
        if (quiz != null) {
        model.addAttribute("questions", questionrepository.findByQuiz(quiz));
        model.addAttribute("quizId", quizId);
    }
		return "questionlist";
	}
    @RequestMapping(value = "/{quizId}/addquestion")
    public String addquestion(@PathVariable("quizId") Long quizId, Model model){
        model.addAttribute("question", new Question());
        model.addAttribute("quizId", quizId);
        return "addquestion";
    }
    @RequestMapping(value = "/{quizId}/savequestion", method = RequestMethod.POST)
    public String savequestion(@PathVariable("quizId") Long quizId, @ModelAttribute Question question) {
        Quiz quiz = quizrepository.findById(quizId).orElse(null);
        if (quiz != null) {
            question.setQuiz(quiz);
            questionrepository.save(question);
        }
        return "redirect:/" + quizId + "/questionlist"; 
    }

    @RequestMapping("/deletequestion/{id}/{quizId}")
    public String deleteQuestion(@PathVariable("id") Long questionid, @PathVariable("quizId") Long quizId) {
        questionrepository.deleteById(questionid);
        return "redirect:/" + quizId + "/questionlist";
    }
}
