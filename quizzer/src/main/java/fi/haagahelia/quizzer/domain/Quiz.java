package fi.haagahelia.quizzer.domain;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long quizid;
    private String name;
    private String description;
    private String published;
    private String date;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "quiz")
    private List <Question> questions;

    public Quiz(){}

    public Quiz(String name, String description, String published, String date) {
        this.name = name;
        this.description = description;
        this.published = published;
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    

    public Long getQuizid() {
        return quizid;
    }

    public void setQuizid(Long quizid) {
        this.quizid = quizid;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPublished() {
        return published;
    }

    public void setPublished(String published) {
        this.published = published;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "Quiz [quizid=" + quizid + ", name=" + name + ", description=" + description + ", published=" + published
                + ", date=" + date + ", questions=" + questions + "]";
    }
    
    
    

    

}
