package fi.haagahelia.quizzer.domain;

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
    private String rating;
    private String reviewtext;

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
    public String getRating() {
        return rating;
    }
    public void setRating(String rating) {
        this.rating = rating;
    }
    public String getReviewtext() {
        return reviewtext;
    }
    public void setReviewtext(String reviewtext) {
        this.reviewtext = reviewtext;
    }

    @Override
    public String toString() {
        return "Review [reviewid=" + reviewid + ", quiz=" + quiz + ", nickname=" + nickname + ", rating=" + rating
                + ", reviewtext=" + reviewtext + "]";
    }

    

    


}
