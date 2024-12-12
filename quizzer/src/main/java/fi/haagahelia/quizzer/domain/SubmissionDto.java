package fi.haagahelia.quizzer.domain;

import jakarta.validation.constraints.NotNull;

public class SubmissionDto {

    @NotNull(message = "Answer option ID cannot be null")
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
