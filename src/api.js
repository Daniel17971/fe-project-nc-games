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

export const fetchReviewComments = (review_id, page) => {
  return gamesApi
    .get(`/reviews/${review_id}/comments?page=${page}`)
    .then((response) => {
      return response.data.comments;
    });
};

export const updateReviewVotes = (review_id, votes) => {
  return gamesApi
    .patch(`/reviews/${review_id}`, { inc_votes: votes })
    .then((response) => {
      return response.data.review;
    });
};

export const postComment = (review_id, comment) => {
  return gamesApi
    .post(`/reviews/${review_id}/comments`, comment)
    .then((response) => {
      return response.data.comment;
    });
};

export const fetchUser = (username) => {
  return gamesApi.get(`/users/${username}`).then((response) => {
    return response.data.user;
  });
};
