import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReview } from "../api";

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
    <section className="review-container">
      <img src={review.review_img_url} alt={review.title} id="review-image" />
      <div id="review-body">
        <p>{review.review_body}</p>
        <p id="review-category">Category : {review.category}</p>
        <p id="review-owner">Published by {review.owner}</p>
      </div>

      <h2 id="review-title">{review.title}</h2>

      <p id="review-votes">Votes {review.votes}</p>
    </section>
  );
};

export default Review;
