package fi.haagahelia.quizzer.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Submission {
    @Id
    private Long submissionid;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "answerid")
    private Answer answer;

    public Long getSubmissionid() {
        return submissionid;
    }

    public Submission(Long submissionid, Answer answer) {
        submissionid = submissionid;
        this.answer = answer;
    }

    public Submission() {
    }

    public void setSubmissionid(Long submissionid) {
        submissionid = submissionid;
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
