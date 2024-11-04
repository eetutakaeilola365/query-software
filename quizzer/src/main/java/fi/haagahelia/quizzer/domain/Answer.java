package fi.haagahelia.quizzer.domain;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long answerid;

    private String choice;
    private Boolean correct;

    @ManyToOne
    @JoinColumn(name = "questionid")
    private Question question;

    public Answer(){}

    public Answer(String choice, Boolean correct) {
        this.choice = choice;
        this.correct = correct;
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

    
    

}
