import { useEffect, useState } from "react";
import { fetchTopReviews } from "../api";

const Homepage = () => {
  const [topReviews, setTopReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchTopReviews().then((data) => {
      setTopReviews(data);
      setIsLoading(false);
    });
  }, [topReviews]);

  return isLoading ? (
    <p>is loading...</p>
  ) : (
    <section className="homepage">
      <h2 id="welcome-title">Welcome</h2>
      <p id="welcome-text">
        Welcome to Super Cool game reviews, Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Earum id architecto expedita illo quae
        ipsa. Nobis quae recusandae fugit! Delectus expedita distinctio, aut
        deserunt esse obcaecati beatae suscipit alias harum. Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Laudantium, illum velit iure
        nisi eos illo voluptatem nesciunt, sunt assumenda sapiente doloribus
        obcaecati ad sed doloremque rerum quos rem recusandae non!
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
