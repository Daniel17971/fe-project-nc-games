import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1 className="header">Super Cool Reviews</h1>
      <nav className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/reviews?sort_by=title&order=desc">Reviews</Link>
        <Link to="/user">User</Link>
      </nav>
    </header>
  );
};

export default Header;
