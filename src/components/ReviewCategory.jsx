import { useParams, useSearchParams } from "react-router-dom";
import { fetchReviews } from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ReviewCategory = () => {
  const category = useParams().category;
  const [allReviews, setAllReviews] = useState([]);
  const [page, setPage] = useState("1");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("sort_by");
  useEffect(() => {
    setIsLoading(true);
    fetchReviews(page, query, 1000).then((data) => {
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
  }, [page, category, query]);
  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setPage(next);
    } else {
      setPage(previous);
    }
  };
  const handleChange = (event) => {
    setSearchParams((currentParams) => {
      return { sort_by: event.target.value };
    });
  };
  const handleChangeOrder = (event) => {
    if (event.target.value === "asc") {
      setAllReviews((currentReviews) => {
        return [...currentReviews].reverse();
      });
    }
    if (event.target.value === "desc") {
      setAllReviews((currentReviews) => {
        return [...currentReviews].reverse();
      });
    }
  };
  return isLoading ? (
    <p>... is loading</p>
  ) : (
    <section>
      <main>
        <h2 id="all-reviews-title">All {category} reviews</h2>
        <label htmlFor="sort-by">sort by </label>
        <select onChange={handleChange} id="sort-by" value={query}>
          <option value="title">Title</option>
          <option value="votes">Votes</option>
          <option value="created_at">Date</option>
          <option value="owner">Username</option>
        </select>
        <label htmlFor="order">order </label>
        <select onChange={handleChangeOrder} id="order">
          <option value="desc">Desending</option>
          <option value="asc">Acsending</option>
        </select>
        <ul className="all-reviews">
          {allReviews
            .filter((review) => review.category === category)
            .map((review) => {
              return (
                <Link
                  to={`/reviews/${review.review_id}`}
                  key={review.review_id}
                >
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
