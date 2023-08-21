/* eslint-disable react/prop-types */
import Style from "./Card.module.css";
import axios from "axios";
import { BaseURL, API_KEY } from "../../utility/Request";
import { useState } from "react";
import YouTube from "react-youtube";
import {
  AiFillPlayCircle,
  AiFillLike,
  AiFillDislike,
  AiOutlinePlusCircle,
} from "react-icons/ai";

export default function Card({ movie, isLargeRow }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isHover, setIsHover] = useState(false);

  const base_url = "https://image.tmdb.org/t/p/original/";

  let width = 200;
  let height = 150;

  if (isLargeRow) {
    width = 310;
    height = 220;
  }

  const opts = {
    width: width,
    height: height,
    playerVars: {
      autoplay: 1,
      loop: 1,
      showinfo: 0,
    },
  };

  const addToMylist = () => {};
  const getMovieTrailer = (id) => {
    axios
      .get(
        `${BaseURL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
      )
      .then((res) => {
        // Assuming the response contains video information, extract the trailer URL
        const videos = res.data.videos.results;
        if (videos.length > 0) {
          const trailer = videos.find(
            (video) => video.name === "Official Trailer"
          );
          console.log(trailer);
          setTrailerUrl(trailer?.key); // Fixed typo: trailer?.Key to trailer?.key
        }
      })
      .catch((err) => {
        console.log(err);
        setTrailerUrl("");
      });
  };

  const onReady = (event) => {
    // Access to player in all event handlers via event.target
    event.target.playVideo();
  };

  const onEnd = (event) => {
    // Restart the video when it ends
    event.target.playVideo();
  };

  // http://api.themoviedb.org/3/movie/131634?api_key=###&append_to_response=videos
  // http://youtube.com/watch?v=Div0iP65aZo

  const handleClick = (id) => {
    getMovieTrailer(id);
  };

  console.log(trailerUrl, "key");
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={isLargeRow ? Style.row_posterLarge : Style.row_poster}
    >
      <img
        className={Style.cardImage}
        // key={movie.id}
        src={`${base_url}${isLargeRow ? movie.largeImg : movie.image}`}
        alt={movie.name}
        onMouseEnter={() => handleClick(movie.id)}
      />
      {isHover && (
        <div
          // style={{ left: isHover && Index * 225 - 50 + Index * 2.5 }}
          className={
            isLargeRow ? Style.largeHoverCardScreen : Style.hoverCardScreen
          }
        >
          {trailerUrl && trailerUrl !== undefined ? (
            <YouTube
              videoId={trailerUrl}
              opts={opts}
              onReady={onReady}
              onEnd={onEnd}
              className={Style.video}
            />
          ) : (
            <img
              className={isLargeRow ? Style.LagrecardImage2 : Style.cardImage2}
              // key={movie.id}
              src={`${base_url}${isLargeRow ? movie.largeImg : movie.image}`}
              alt={movie.name}
              onClick={() => handleClick(movie.id)}
            />
          )}
          <div className={isLargeRow ? Style.largeCardInfo : Style.cardInfo}>
            <p>{movie.name}</p>
            <div
              className={isLargeRow ? Style.largeCard_icons : Style.card_icons}
            >
              <AiFillPlayCircle />
              <AiFillDislike />
              <AiFillLike />
              <AiOutlinePlusCircle onClick={addToMylist} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
