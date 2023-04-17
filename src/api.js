import axios from "axios";

export const fetchTopReviews = () => {
  return axios
    .get(
      `https://danx-games-reviews.onrender.com/api/reviews?sort_by=votes&limit=3`
    )
    .then((response) => {
      return response.data.reviews.results;
    });
};

export const fetchReviews = (page) => {
  return axios
    .get(`https://danx-games-reviews.onrender.com/api/reviews?page=${page}`)
    .then((response) => {
      return response.data.reviews;
    });
};
