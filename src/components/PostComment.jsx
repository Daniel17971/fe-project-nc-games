import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../api";
import { LoginContext } from "../contexts/Login";

const PostComment = ({ setCommentsList }) => {
  const review_id = useParams();
  const [body, setBody] = useState("");
  const [hasPosted, setHasPosted] = useState(false);
  const [err, setErr] = useState(null);
  const [newComment, setNewComment] = useState({});

  const { user } = useContext(LoginContext);

  useEffect(() => {
    if (Object.keys(newComment).length && newComment.body) {
      postComment(review_id.review_id, newComment)
        .then((data) => {
          setHasPosted(true);
          setErr(null);
          setBody("");
          setNewComment({});
          setCommentsList((currentList) => {
            return [data, ...currentList];
          });
        })
        .catch((err) => {
          setBody("");
          setNewComment({});
          setErr("Your not logged in!");
        });
    }
  }, [newComment, review_id.review_id, setCommentsList]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewComment((currentComment) => {
      return { ...currentComment, username: user, body };
    });
  };

  return (
    <section className="post-comment">
      {err ? <p>{err}</p> : null}
      {hasPosted ? <p>your comment has been posted</p> : null}
      <form onSubmit={handleSubmit} className="comment-form">
        <label htmlFor="textarea-input">comment: </label>
        <textarea
          type="text"
          id="textarea-input"
          rows="4"
          cols="50"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
        <button type="Submit">Submit</button>
      </form>
    </section>
  );
};

export default PostComment;
