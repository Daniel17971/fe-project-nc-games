import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/Login";
import { fetchUser } from "../api";

const User = () => {
  const { setUser, user } = useContext(LoginContext);
  const [newName, setNewName] = useState("");
  const [submitName, setSubmitName] = useState("");
  const [isLogedIn, setIsLogedIn] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    if (submitName) {
      fetchUser(submitName)
        .then((data) => {
          setUser(data.username);
          setErr(null);
          setIsLogedIn(false);
        })
        .catch((err) => {
          setErr(true);
        });
      setSubmitName("");
      setNewName("");
    }
  }, [submitName, setUser]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitName(newName);
  };
  return isLogedIn ? (
    <section>
      <h2>User page</h2>
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
    </section>
  ) : (
    <p>Welcome back {user}</p>
  );
};

export default User;
