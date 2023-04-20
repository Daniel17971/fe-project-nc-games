import { useParams } from "react-router-dom";
import { fetchReviewsCategory } from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ReviewCategory = () => {
  const category = useParams().category;
  const [allReviews, setAllReviews] = useState([]);
  const [page, setPage] = useState("1");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetchReviewsCategory(page, category).then((data) => {
      setAllReviews(data.results);
      setIsLoading(false);
      if (data.hasOwnProperty("next")) {
        setNext(data.next.page);
      }
      if (data.hasOwnProperty("previous")) {
        setPrevious(data.previous.page);
      }
      if (!data.hasOwnProperty("next")) {
        setNext("");
      }
      if (!data.hasOwnProperty("previous")) {
        setPrevious("");
      }
    });
  }, [page, category]);
  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setPage(next);
    } else {
      setPage(previous);
    }
  };

  return isLoading ? (
    <p>... is loading</p>
  ) : (
    <section>
      <main>
        <h2 id="all-reviews-title">All {category} reviews</h2>
        <ul className="all-reviews">
          {allReviews.map((review) => {
            return (
              <Link to={`/reviews/${review.review_id}`} key={review.review_id}>
                <li key={review.review_id} className="all-reviews-review">
                  <h3>{review.title}</h3>
                  <img src={review.review_img_url} alt={review.title} />
                  <p>User : {review.owner}</p>
                  <p>Votes : {review.votes}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </main>
      <nav id="all-reviews-nav">
        {previous ? (
          <button onClick={handleClick} value="">
            previous
          </button>
        ) : (
          <div></div>
        )}
        {page}
        {next ? (
          <button onClick={handleClick} value="next">
            next
          </button>
        ) : (
          <div></div>
        )}
      </nav>
    </section>
  );
};

export default ReviewCategory;
