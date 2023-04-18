import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../api";

const PostComment = () => {
  const review_id = useParams();
  const [newComment, setNewComment] = useState({});
  const [userName, setUserName] = useState("");
  const [body, setBody] = useState("");
  const [hasPosted, setHasPosted] = useState(false);
  const [returnComment, setReturnComment] = useState({});
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (Object.keys(newComment).length) {
      postComment(review_id.review_id, newComment)
        .then((data) => {
          setErr(null);
          setNewComment({});
          setReturnComment(data);
          setHasPosted(true);
        })
        .catch((err) => {
          setErr("That User doesn't exsist!!!");
        });
    }
  }, [newComment, review_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewComment((currentComment) => {
      return { ...currentComment, username: userName, body };
    });
  };

  return (
    <section className="post-comment">
      <h2>Comment Here</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <label htmlFor="username-input">Username: </label>
        <input
          type="text"
          id="username-input"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <label htmlFor="textarea-input">comment: </label>
        <textarea
          type="text"
          id="textarea-input"
          rows="4"
          cols="50"
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
        <button type="Submit">Submit</button>
      </form>
      {err ? <p>{err}</p> : null}
      {hasPosted ? (
        <ul>
          <li key={returnComment.comment_id} className="review-comment">
            <h3>By {returnComment.author}</h3>
            <p>{returnComment.body}</p>
            <p id="comment-date">
              posted on {returnComment.created_at.slice(0, 10)}
            </p>
            <p id="comment-votes">votes {returnComment.votes}</p>
          </li>
        </ul>
      ) : null}
    </section>
  );
};

export default PostComment;
