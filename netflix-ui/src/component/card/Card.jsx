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
import { BsCheckCircle } from "react-icons/bs";
import { selectUser } from "../../redux/userSlicer";
import { useDispatch, useSelector } from "react-redux";
import { removeMovieFromLiked } from "../../redux/videoSlicer";

export default function Card({ movie, isLargeRow, isLiked, Index }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isHover, setIsHover] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const base_url = "https://image.tmdb.org/t/p/original/";

  let width = 220;
  let height = 180;

  if (isLargeRow) {
    width = 300;
    height = 250;
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

  const addToMylist = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email: user.email,
        data: movie,
      });
    } catch (err) {
      console.log(err);
    }
  };
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
          // console.log(trailer);
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
    setIsHover(true);
  };

  // console.log(trailerUrl, "key");
  return (
    <div
      onMouseEnter={() => handleClick(movie.id)}
      onMouseLeave={() => setIsHover(false)}
      className={isLargeRow ? Style.row_posterLarge : Style.row_poster}
    >
      <img
        className={isLargeRow ? Style.largeCardImage : Style.cardImage}
        src={`${base_url}${isLargeRow ? movie.largeImg : movie.image}`}
        alt={movie.name}
      />
      {isHover && (
        <div
          className={
            isLargeRow ? Style.largeHoverCardScreen : Style.hoverCardScreen
          }
          style={{ left: isHover && Index * 4 - 35 + Index }}
        >
          <div className={Style.image_video_container}>
            <img
              className={isLargeRow ? Style.LagrecardImage2 : Style.cardImage2}
              src={`${base_url}${isLargeRow ? movie.largeImg : movie.image}`}
              alt={movie.name}
            />
            {trailerUrl && trailerUrl !== undefined && (
              <YouTube
                videoId={trailerUrl}
                opts={opts}
                onReady={onReady}
                onEnd={onEnd}
                className={Style.video}
              />
            )}
          </div>

          <div className={isLargeRow ? Style.largeCardInfo : Style.cardInfo}>
            <p>{movie.name}</p>
            <div
              className={isLargeRow ? Style.largeCard_icons : Style.card_icons}
            >
              <AiFillPlayCircle />
              <AiFillDislike />
              <AiFillLike />
              {isLiked ? (
                <BsCheckCircle
                  onClick={() => {
                    dispatch(
                      removeMovieFromLiked({
                        movieId: movie.id,
                        email: user.email,
                      })
                    );
                  }}
                />
              ) : (
                <AiOutlinePlusCircle onClick={addToMylist} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
