import { useEffect, useState } from "react";
import style from "./Banner.module.css";
import axios from "../../utility/Axios";
import requests from "../../utility/Request";

export default function Banner() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomIndex = Math.floor(
        Math.random() * request.data.results.length
      );
      setMovies(request.data.results[randomIndex]);
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className={style.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movies?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className={style.banner_contents}>
        <h1 className={style.banner_title}>
          {movies?.title || movies?.original_name}
        </h1>
        <div className={style.banner_buttons}>
          <button className={style.banner_button}>Play</button>
          <button className={style.banner_button}>My List</button>
        </div>
        <h1 className={`${style.banner_description} ${style.typewriter}`}>
          {truncate(movies?.overview, 150)}
        </h1>
      </div>
      <div className={style.banner_feadBottom} />
    </header>
  );
}
