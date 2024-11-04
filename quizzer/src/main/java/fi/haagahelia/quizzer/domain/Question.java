package fi.haagahelia.quizzer.domain;

public class Question {

    private String name;
    private String difficulty;

    public Question (){}

    public Question(String name, String difficulty) {
        this.name = name;
        this.difficulty = difficulty;
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
        return "Question [name=" + name + ", difficulty=" + difficulty + "]";
    }

    
}
