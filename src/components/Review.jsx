import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReview, updateReviewVotes } from "../api";
import Comments from "./Comments";

const Review = () => {
  const review_id = useParams().review_id;
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState("");
  const [err, setErr] = useState(null);
  const [hasVoted, setHasVoted] = useState(true);
  const [inc, setInc] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetchReview(review_id).then((data) => {
      setReview(data);
      setVotes(data.votes);
      setIsLoading(false);
    });
  }, [review_id]);

  const handleClick = () => {
    if (hasVoted) {
      setInc(1);
      setHasVoted(false);
    } else {
      setInc(-1);
      setHasVoted(true);
    }
    setVotes((currentVote) => currentVote + inc);
    setErr(null);
    updateReviewVotes(review_id, inc).catch((err) => {
      setVotes((currentVote) => currentVote - inc);
      setErr("sorry theres been an error, please try again");
    });
  };

  return isLoading ? (
    <p>is loading ...</p>
  ) : (
    <section className="review-page">
      <section className="review-container">
        <img src={review.review_img_url} alt={review.title} id="review-image" />
        <div id="review-body">
          <p>{review.review_body}</p>
          <p id="review-owner">Review by {review.owner}</p>
          <p id="review-category">Category : {review.category}</p>
          <p id="review-designer">Game made by {review.designer}</p>
        </div>

        <h2 id="review-title">{review.title}</h2>

        <button id="review-votes" type="submit" onClick={handleClick}>
          Votes {votes}
        </button>
        {err ? <p id="review-vote-err">{err}</p> : null}
      </section>
      <Comments review_id={review_id} />
    </section>
  );
};

export default Review;
