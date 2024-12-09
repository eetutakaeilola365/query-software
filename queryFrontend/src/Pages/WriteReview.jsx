import Quiz from "./Quiz"

function WriteReview (){

    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    return (
        <main>
            <header>
                <h1>{Quiz.name}</h1>
            </header>
            <div>
                <label>
                    Username: <input name="Username"/>
                </label>
                <p>
                    <p>Rating:</p>
                    <label>
                        <input type="radio" 
                        name="rating" 
                        value="1" />
                        1
                    </label>
                </p>
                <p>
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value="2"
                            defaultChecked={true} 
                        />
                        2
                    </label>
                </p>
                <p>
                    <label>
                        <input type="radio" 
                        name="rating" 
                        value="3" />
                        3
                    </label>
                </p>
                <p>
                    <label>
                        <input type="radio" 
                        name="rating" 
                        value="4" />
                        4
                    </label>
                </p>
                <label>
                    <input type="radio" 
                    name="rating" 
                    value="5" />
                    5
                </label>
                <p>
                <label>
                    Write your review: <input type="text"
                    name="review"
                    />
                </label>
                </p>
                <div>
                <p>{formattedDate}</p>
                <button>Submit</button>
                </div>
            </div>
        </main>
        )
    
}
export default WriteReview