package fi.haagahelia.quizzer.web;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import fi.haagahelia.quizzer.domain.QuizzRepository;

import fi.haagahelia.quizzer.domain.Quiz;

@Controller
public class QuizController {
	@Autowired
	private QuizzRepository quizrepository;
    
	 @GetMapping("/addquiz")
     public String addQuiz(Model model) {
         model.addAttribute("quiz", new Quiz());
         return "addquiz";
     }

	@GetMapping("/quizlist")
	public String getQuiz(Model model) {
        model.addAttribute("quizzes", quizrepository.findAll());
		return "quizlist";
	}

	@PostMapping("/savequiz")
     public String saveQuiz(Quiz quiz) {

        
         quizrepository.save(quiz);
        
         return "redirect:/quizlist";
     }

     @RequestMapping(value = "/editquiz/{id}")
        public String editQuiz(@PathVariable("id") Long quizid, Model model){
            Quiz quizz = quizrepository.findById(quizid).orElse(null);
            model.addAttribute("quizname", quizz.getName());
            model.addAttribute("quiz", quizrepository.findById(quizid));
            return "editquiz";
    }

    @RequestMapping("/deletequiz/{id}")
    public String deleteQuiz(@PathVariable("id") Long quizid) {
        quizrepository.deleteById(quizid);
        return "redirect:/quizlist";
    }

}
