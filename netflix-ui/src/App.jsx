import HomePage from "./pages/home/HomePage";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utility/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/userSlicer";
import ProfileScreen from "./pages/profile/ProfileScreen";
import TVShows from "./pages/tvshows/TVShows";
import MoviePage from "./pages/moviePage/MoviePage";
import UserListedMovies from "./pages/myList/UserListedMovies";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // looged in
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        // logged out
        dispatch(logout());
        navigate("/");
      }
    });

    return unsubscribe;
  }, [dispatch, navigate]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={!user ? <Signup /> : <HomePage />} />
        <Route path="/profile" element={<ProfileScreen />} />
        {/* <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/movies" element={<MoviePage />} /> */}
        <Route exact path="/mylist" element={<UserListedMovies />} />
      </Routes>
    </div>
  );
}

export default App;
