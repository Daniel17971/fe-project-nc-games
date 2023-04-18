import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReview } from "../api";
import Comments from "./Comments";

const Review = () => {
  const review_id = useParams().review_id;
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReview(review_id).then((data) => {
      setReview(data);
      setIsLoading(false);
    });
  }, [review_id]);
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

        <p id="review-votes">Votes {review.votes}</p>
      </section>
      <Comments review_id={review_id} />
    </section>
  );
};

export default Review;
