package fi.haagahelia.quizzer.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long answerid;

    private String choice;
    private Boolean correct;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "questionid")
    private Question question;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "answer") // , orphanRemoval = true
    private List<Submission> submissions;

    public List<Submission> getSubmissions() {
        return submissions;
    }

    public void setSubmissions(List<Submission> submissions) {
        this.submissions = submissions;
    }

    public Answer() {
    }

    public Answer(String choice, Boolean correct) {
        this.choice = choice;
        this.correct = correct;
    }

    public boolean isCorrect() {
        return correct;
    }

    public String getChoice() {
        return choice;
    }

    public void setChoice(String choice) {
        this.choice = choice;
    }

    public Boolean getCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public Long getAnswerid() {
        return answerid;
    }

    public void setAnswerid(Long answerid) {
        this.answerid = answerid;
    }

    @Override
    public String toString() {
        return "Answer [answerid=" + answerid + ", choice=" + choice + ", correct=" + correct + "]";
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

}
