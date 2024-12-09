package fi.haagahelia.quizzer.domain;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Review {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long reviewid;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "quizid")
    private Quiz quiz;

    private String nickname;
    private Integer rating;
    private String reviewtext;
    @CreationTimestamp
    private LocalDate date;


    public Review () {}

    public long getReviewid() {
        return reviewid;
    }
    public void setReviewid(long reviewid) {
        this.reviewid = reviewid;
    }
    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public Integer getRating() {
        return rating;
    }
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    public String getReviewtext() {
        return reviewtext;
    }
    public void setReviewtext(String reviewtext) {
        this.reviewtext = reviewtext;
    }
    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Review [reviewid=" + reviewid + ", quiz=" + quiz + ", nickname=" + nickname + ", rating=" + rating
                + ", reviewtext=" + reviewtext + ", date=" + date + "]";
    }

    
    
    


    

    


}
