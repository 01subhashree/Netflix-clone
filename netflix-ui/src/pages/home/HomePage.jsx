import Row from "../../component/rows/Row";
import Banner from "../../component/banner/Banner";
import Navbar from "../../component/navbar/Navbar";
// import requests from "../../utility/Request";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMovies, getGenres } from "../../redux/videoSlicer";

export default function HomePage() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  console.log(movies);
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <div>
      <Navbar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        // fetchUrl={requests.fetchNetflixOriginals}
        data={getMoviesFromRange(0, 20)}
        isLargeRow
      />
      <Row
        title="Trending Now"
        // fetchUrl={requests.fetchTrending}
        data={getMoviesFromRange(20, 40)}
      />
      <Row
        title="Top Rated"
        // fetchUrl={requests.fetchTopRated}
        data={getMoviesFromRange(40, 60)}
      />
      <Row
        title="Popular on Netflix"
        //  fetchUrl={requests.fetchActionMovies}
        data={getMoviesFromRange(60, 80)}
      />
      <Row
        title="Action Movies"
        // fetchUrl={requests.fetchComedyMovies}
        data={getMoviesFromRange(80, 100)}
      />
      <Row
        title="Epics"
        // fetchUrl={requests.fetchHorrorMovies}
        data={getMoviesFromRange(100, 120)}
      />
      {/* <Row title="Romance Movies" 
      fetchUrl={requests.fetchRomanceMovies} 
      />
      <Row title="Documentaries" 
      fetchUrl={requests.fetchDocumentaries} 
      /> */}
    </div>
  );
}
