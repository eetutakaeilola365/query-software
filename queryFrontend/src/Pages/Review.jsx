import{Link} from 'react-router-dom'
function Review() {

return (
    <div>
        <h2>Reviews of</h2>
        <Link color="inherit" component={Link} to="/writereview">Write your review</Link>
    </div>
    
    )
}

export default Review;
