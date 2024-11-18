package fi.haagahelia.quizzer.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import fi.haagahelia.quizzer.domain.AnsverRepository;
import fi.haagahelia.quizzer.domain.Answer;
import fi.haagahelia.quizzer.domain.QuesitonRepository;
import fi.haagahelia.quizzer.domain.Question;
import fi.haagahelia.quizzer.domain.Quiz;
import fi.haagahelia.quizzer.domain.QuizzRepository;

@Controller
public class AnswerController {


    @Autowired
    private QuesitonRepository questionrepository;

    @Autowired
    private AnsverRepository arepository;


    @GetMapping("/{questionId}/answerlist")
	public String getQuestion(@PathVariable("questionId") Long questionId, Model model) {
        Question question = questionrepository.findById(questionId).orElse(null);
        //Quiz quiz = quizrepository.findById(quizId).orElse(null);
        if (question != null) {
        model.addAttribute("answers", arepository.findByQuestion(question));
        model.addAttribute("questionId", questionId);
        Quiz quiz = question.getQuiz();
        model.addAttribute("quizId", quiz.getQuizid());
        //model.addAttribute("quiz", quiz);
    }
		return "answerlist";
	}

    @RequestMapping(value = "/{questionId}/addanswer")
    public String addAnswer(@PathVariable("questionId") Long questionId, Model model){
        model.addAttribute("answer", new Answer());
        model.addAttribute("questionId", questionId);
        return "addanswer";
    }
    @RequestMapping(value = "/{questionId}/saveanswer", method = RequestMethod.POST)
    public String saveAnswer(@PathVariable("questionId") Long questionId, @ModelAttribute Answer answer) {
        Question question = questionrepository.findById(questionId).orElse(null);
        if (question != null) {
            answer.setQuestion(question);
            arepository.save(answer);
        }
        return "redirect:/" + questionId + "/answerlist"; 
    }

    @RequestMapping("/deleteanswer/{id}/{questionId}")
    public String deleteQuestion(@PathVariable("id") Long answerid, @PathVariable("questionId") Long questionId) {
        arepository.deleteById(answerid);
        return "redirect:/" + questionId + "/answerlist";
    }
    
}
