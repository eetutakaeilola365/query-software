package fi.haagahelia.quizzer.domain;

public class Answer {

    private String choice;
    private Boolean correct;

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

    @Override
    public String toString() {
        return "Answer [choice=" + choice + ", correct=" + correct + "]";
    }

    

}
