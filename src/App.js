import { Route, Routes } from "react-router-dom";
import "./App.css";
// @ts-ignore
import Header from "./components/Header";
import Homepage from "./components/Homepage";
// @ts-ignore
import User from "./components/User";
import AllReview from "./components/AllReviews";
import Review from "./components/Review";
import ReviewCategory from "./components/ReviewCategory";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user" element={<User />} />
        <Route path="/reviews" element={<AllReview />} />
        <Route path="/reviews/:review_id" element={<Review />} />
        <Route
          path="/reviews/category/:category"
          element={<ReviewCategory />}
        />
      </Routes>
    </div>
  );
}

export default App;
