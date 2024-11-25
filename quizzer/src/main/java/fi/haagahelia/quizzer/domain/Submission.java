package fi.haagahelia.quizzer.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Submission {
    private Long Submissionid;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "answerid")
    private Answer answer;

    public Long getSubmissionid() {
        return Submissionid;
    }

    public Submission(Long submissionid, Answer answer) {
        Submissionid = submissionid;
        this.answer = answer;
    }

    public Submission() {
    }

    public void setSubmissionid(Long submissionid) {
        Submissionid = submissionid;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "Submission [Submissionid=" + Submissionid + ", answer=" + answer + "]";
    }
    
}
