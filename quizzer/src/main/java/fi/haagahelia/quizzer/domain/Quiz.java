package fi.haagahelia.quizzer.domain;

public class Quiz {

    private String name;
    private String description;
    private Boolean published;
    private String date;

    public Quiz(){}

    public Quiz(String name, String description, Boolean published, String date) {
        this.name = name;
        this.description = description;
        this.published = published;
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Quiz [name=" + name + ", description=" + description + ", published=" + published + ", date=" + date
                + "]";
    }

    

    

}
