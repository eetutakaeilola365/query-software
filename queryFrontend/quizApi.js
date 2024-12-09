export function getQuizzes(){
    return fetch(import.meta.env.VITE_API_URL+"/quizzes")
    .then(response => {
        if (!response.ok)
            throw new Error("Error in fetch" + response.statusText)

        return response.json();
    })
}

export function getQuiz(id){
    return fetch(import.meta.env.VITE_API_URL+"/quizzes/"+id)
    .then(response => {
        if (!response.ok)
            throw new Error("Error in fetch" + response.statusText);

        return response.json();
    })
}

export function getCategories(){
    return fetch(import.meta.env.VITE_API_URL+"/categories")
    .then(response => {
        if (!response.ok)
            throw new Error("Error in fetch" + response.statusText);

        return response.json();
    })
}

export function getCategories2(){
    return fetch(import.meta.env.VITE_API_URL+"/")
    .then(response => {
        if (!response.ok)
            throw new Error("Error in fetch" + response.statusText);

        return response.json();
    })
}


export function getCategory(id){
    return fetch(import.meta.env.VITE_API_URL+"/categories/"+id)
    .then(response => {
        if (!response.ok)
            throw new Error("Error in fetch" + response.statusText);

        return response.json();
    })
}

export function getPublishedQuizzesByCategory(id){
    return fetch(import.meta.env.VITE_API_URL+"/categories/"+id+"/quizzes")
    .then(response => {
        if (!response.ok)
            throw new Error("Error in fetch" + response.statusText);

        return response.json();
    })
}

export function getQuizQuestionsById(id){
    return fetch(import.meta.env.VITE_API_URL+"/quizzes/"+id+"/questions")
    .then(response => {
        if (!response.ok)
            throw new Error("Error in fetch" + response.statusText);

        return response.json();
    })
}

export function postSubmission(newSubmission) {
    return fetch(import.meta.env.VITE_API_URL+"/submissions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({answerOptionId: newSubmission})
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error in submitting answer: " + response.statusText+JSON.stringify({answerOptionId: newSubmission}));

        return response.json();
    });
}

export function getResultsByQuizID(id) {
    return fetch(import.meta.env.VITE_API_URL + "/quizzes/" + id + "/submissions")
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetching submissions: " + response.statusText);

            return response.json();
        });
}

export function getQuizSubmissionsById(quizId) {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/seeresults/${quizId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error in fetch: ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error fetching quiz submissions:", error);
            throw error;
        });
}
