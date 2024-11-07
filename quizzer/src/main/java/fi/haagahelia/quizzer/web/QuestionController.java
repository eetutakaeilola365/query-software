package fi.haagahelia.quizzer.web;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fi.haagahelia.quizzer.domain.QuizzRepository;

import fi.haagahelia.quizzer.domain.Quiz;
import fi.haagahelia.quizzer.domain.Answer;
import fi.haagahelia.quizzer.domain.Question;

@Controller
public class QuestionController {

    @RequestMapping(value = "/addquestion")
    public String addSong(Model model){
        model.addAttribute("question", new Question());
        return "addquestion";
    }

}
