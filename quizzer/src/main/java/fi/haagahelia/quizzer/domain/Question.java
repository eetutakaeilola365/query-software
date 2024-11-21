package fi.haagahelia.quizzer.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long questionid;

    private String name;
    private String difficulty;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "question")//, orphanRemoval = true
    private List <Answer> answers;

    @ManyToOne
    @JoinColumn(name = "quizid")
    private Quiz quiz;

    public Question (){}

    public Question(String name, String difficulty) {
        this.name = name;
        this.difficulty = difficulty;
    }

    

    public Long getQuestionid() {
        return questionid;
    }

    public void setQuestionid(Long questionid) {
        this.questionid = questionid;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    @Override
    public String toString() {
        return "Question [questionid=" + questionid + ", name=" + name + ", difficulty=" + difficulty;
    }

    

    
}
