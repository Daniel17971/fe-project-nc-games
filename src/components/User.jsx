import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/Login";
import { fetchUser, fetchUsers } from "../api";

const User = () => {
  const { setUser, user, setUserImg } = useContext(LoginContext);
  const [newName, setNewName] = useState("");
  const [submitName, setSubmitName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [err, setErr] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetchUsers().then((data) => {
      setIsLoading(false);
      setUsersList(data);
    });
    if (submitName) {
      fetchUser(submitName)
        .then((data) => {
          setUser(data.username);
          setUserImg(data.avatar_url);
          setErr(null);
          setIsLoggedIn(false);
        })
        .catch((err) => {
          setErr(true);
        });
      setSubmitName("");
      setNewName("");
    }
  }, [submitName, setUser, setUserImg]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitName(newName);
  };
  return isLoggedIn ? (
    <section>
      <h2>User page</h2>
      {user ? <p>your currently logged in as {user}</p> : null}
      <form id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username-input">username</label>
        <input
          type="text"
          id="username-input"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        ></input>
        <button type="submit">Login</button>
      </form>
      {err ? <p>sorry that name doesnt exsist</p> : null}
      {isLoading ? (
        <p>... is loading</p>
      ) : (
        <section>
          <h3>List of usernames</h3>
          <ul>
            {usersList.map((user) => {
              return <li>{user.username}</li>;
            })}
          </ul>
        </section>
      )}
    </section>
  ) : (
    <p>Welcome back {user}</p>
  );
};

export default User;
