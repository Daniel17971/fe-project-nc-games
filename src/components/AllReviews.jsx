import { useEffect, useState } from "react";
import { fetchReviews } from "../api";

const AllReview = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [page, setPage] = useState("1");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchReviews(page).then((data) => {
      setAllReviews(data.results);
      setIsLoading(false);
      if (data.hasOwnProperty("next")) {
        setNext(data.next.page);
      }
      if (data.hasOwnProperty("previous")) {
        setPrevious(data.previous.page);
      }
    });
  }, [page]);
  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setPage(next);
    } else {
      setPage(previous);
    }
  };
  return isLoading ? (
    <p>is loading ...</p>
  ) : (
    <section className="reviews">
      <main>
        <h2>All reviews</h2>
        <ul className="all-reviews">
          {allReviews.map((review) => {
            return (
              <li key={review.review_id} className="all-reviews-review">
                <h3>{review.title}</h3>
                <img src={review.review_img_url} alt={review.title} />
                <p>Category : {review.category}</p>
                <p>User : {review.owner}</p>
                <p>Votes : {review.votes}</p>
              </li>
            );
          })}
        </ul>
      </main>
      <nav>
        <button onClick={handleClick} value="">
          previous
        </button>
        {page}
        <button onClick={handleClick} value="next">
          next
        </button>
      </nav>
    </section>
  );
};
export default AllReview;
