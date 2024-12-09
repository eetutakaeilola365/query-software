package fi.haagahelia.quizzer.domain;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubmissionService {
    
    public int countCorrectAnswers(List<Submission> submissions) {
        int count = 0;
        
        for (Submission submission : submissions) {
            if (submission.getAnswer().isCorrect()) {
                count++;
            }
        }

        return count;
    }
}
