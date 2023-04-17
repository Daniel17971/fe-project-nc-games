import { useEffect, useState } from "react";
import { fetchTopReviews } from "../api";

const Homepage = () => {
  const [topReviews, setTopReviews] = useState([]);
  useEffect(() => {
    fetchTopReviews().then((data) => {
      setTopReviews(data);
    });
  }, [topReviews]);

  return (
    <section className="homepage">
      <h2 id="welcome-title">Welcome</h2>
      <p id="welcome-text">
        Welcome to Super Cool game reviews, bringing only the highest quality
        review content on the most obscure set of games you've ever heard of.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium,
        illum velit iure nisi eos illo voluptatem nesciunt, sunt assumenda
        sapiente doloribus obcaecati ad sed doloremque rerum quos rem recusandae
        non!
      </p>
      <div className="highlighted-container">
        <h3>Highest voted Reviews</h3>
        <ul className="highlighted-reviews">
          {topReviews.map((review) => {
            return (
              <li key={review.review_id} className="highlighted-review">
                <h4>{review.title}</h4>
                <img src={review.review_img_url} alt={review.title} />
                <p>Category: {review.category}</p>
                <p>User: {review.owner}</p>
                <p>Votes: {review.votes}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default Homepage;
