package fi.haagahelia.quizzer.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import fi.haagahelia.quizzer.domain.Category;
import fi.haagahelia.quizzer.domain.CategoryRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
public class CategoryController {

    @Autowired private CategoryRepository categoryrepo;

    @GetMapping("/categorylist")
    public String getCategories(Model model) {
        model.addAttribute("categories", categoryrepo.findAll());
        return "categorylist";
    }

    @GetMapping("/addcategory")
    public String addCategory(Model model) {
        model.addAttribute("category", new Category());
        return "addcategory";
    }

    @PostMapping("savecategory")
    public String saveCategory(Category category) {
        categoryrepo.save(category);
        return "redirect:/categorylist";
    }

    @RequestMapping("/deletecategory/{id}")
    public String deleteQuiz(@PathVariable("id") Long categoryid) {
        categoryrepo.deleteById(categoryid);
        return "redirect:/categorylist";
    }
    


    
    

}
