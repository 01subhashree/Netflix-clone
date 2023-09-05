import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../component/navbar/Navbar";
// import { selectUser } from "../../redux/userSlicer";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../utility/firebase";
import { getUsersLikedMovies } from "../../redux/videoSlicer";
import Card from "../../component/card/Card";
import style from "./UserListedMovies.module.css";

export default function UserListedMovies() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
  });

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [email]);

  console.log(movies);
  console.log(email);

  return (
    <div className={style.likedMovies_screen}>
      <div className={style.likedMovies_screenDiv}>
        <Navbar />
        <h2>My List</h2>
        <div className={style.likedMovies}>
          {movies &&
            movies.map((movie) => (
              <div key={movie.id} className={style.likedMovies_cards}>
                <Card movie={movie} isLiked={true} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
