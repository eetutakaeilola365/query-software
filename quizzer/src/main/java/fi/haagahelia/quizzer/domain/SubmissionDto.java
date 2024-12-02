package fi.haagahelia.quizzer.domain;


public class SubmissionDto {
    private Long answerOptionId;

    public Long getAnswerOptionId() {
        return answerOptionId;
    }

    public SubmissionDto() {
    }

    public SubmissionDto(Long answerOptionId) {
        this.answerOptionId = answerOptionId;
    }

    public void setAnswerOptionId(Long answerOptionId) {
        this.answerOptionId = answerOptionId;
    }
}
