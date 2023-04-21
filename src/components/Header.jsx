import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/Login";

const Header = () => {
  const { user, userImg } = useContext(LoginContext);
  return (
    <header>
      <h1 className="header">Super Cool Reviews</h1>
      <nav className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/reviews?sort_by=title&order=desc">Reviews</Link>
      </nav>
      <nav className="user-nav">
        <Link to="/user">
          {user ? (
            <div>
              <img src={userImg} alt={user} id="avatar" />
              <p id="username-display">{user}</p>
            </div>
          ) : (
            <p>User</p>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
