import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../component/navbar/Navbar";
import { selectUser } from "../../redux/userSlicer";
import { useEffect } from "react";
import { getUsersLikedMovies } from "../../redux/videoSlicer";
import Card from "../../component/card/Card";
import style from "./UserListedMovies.module.css";

export default function UserListedMovies() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(getUsersLikedMovies(user.email));
    }
  }, [user]);

  return (
    <div className={style.likedMovies_screen}>
      <Navbar />
      <h1>My List</h1>
      <div className={style.likedMovies}>
        {movies.map((movie) => (
          <div key={movie.id} className={style.likedMovies_cards}>
            <Card movie={movie} isLiked={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
