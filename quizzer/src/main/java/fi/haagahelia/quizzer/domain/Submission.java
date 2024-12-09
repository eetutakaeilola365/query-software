package fi.haagahelia.quizzer.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long submissionid;

    @ManyToOne
    @JoinColumn(name = "answerid")
    private Answer answer;

    public Long getSubmissionid() {
        return submissionid;
    }

    public Submission(Long submissionid, Answer answer) {
        this.submissionid = submissionid;
        this.answer = answer;
    }

    public Submission() {
    }

    public void setSubmissionid(Long submissionid) {
        this.submissionid = submissionid;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "Submission [Submissionid=" + submissionid + ", answer=" + answer + "]";
    }
    
}
