import axios from "axios";
const gamesApi = axios.create({
  baseURL: "https://danx-games-reviews.onrender.com/api",
});
export const fetchTopReviews = () => {
  return gamesApi.get(`/reviews?sort_by=votes&limit=3`).then((response) => {
    return response.data.reviews.results;
  });
};

export const fetchReviews = (page) => {
  return gamesApi.get(`/reviews?page=${page}`).then((response) => {
    return response.data.reviews;
  });
};

export const fetchReview = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}`).then((response) => {
    return response.data.review;
  });
};
