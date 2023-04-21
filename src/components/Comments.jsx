import { useContext, useEffect, useState } from "react";
import { deleteComment, fetchReviewComments } from "../api";
import { LoginContext } from "../contexts/Login";

const Comments = ({ review_id, commentsList, setCommentsList }) => {
  const [page, setPage] = useState("1");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useContext(LoginContext);
  useEffect(() => {
    setIsLoading(true);
    fetchReviewComments(review_id, page).then((data) => {
      setIsLoading(false);
      if (data.results.length) {
        setCommentsList(data.results);
      } else {
        setCommentsList(0);
      }

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
  }, [page, review_id, setCommentsList]);
  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setPage(next);
    } else {
      setPage(previous);
    }
  };
  const handleDelete = (event) => {
    setIsDeleting(true);
    deleteComment(event.target.value).then((response) => {
      setCommentsList((currentComments) => {
        return currentComments.filter((element) => {
          return element.comment_id !== +event.target.value;
        });
      });
      setIsDeleting(false);
    });
  };
  return isLoading ? (
    <p>... is loading</p>
  ) : (
    <section className="review-comments">
      {commentsList ? (
        <ul>
          <h2>Comments</h2>
          {commentsList.map((comment) => {
            return (
              <li key={comment.comment_id} className="review-comment">
                <h3>By {comment.author}</h3>
                <p>{comment.body}</p>
                <p id="comment-date">
                  posted on {comment.created_at.slice(0, 10)}
                </p>
                <p id="comment-votes">votes {comment.votes}</p>
                {isDeleting ? (
                  <p>... deleting comment</p>
                ) : (
                  <div>
                    {user === comment.author ? (
                      <button
                        id="delete-comment"
                        type="submit"
                        onClick={handleDelete}
                        value={comment.comment_id}
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>no comments yet</p>
      )}

      <nav>
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

export default Comments;
