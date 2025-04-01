import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import "./MovieList.css";

export const MovieList = ({ type, page, currentGenre }) => {
  const [movieList, setMovieList] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        type === "movie"
          ? `${
              import.meta.env.VITE_API_URL_MOVIES
            }&page=${page}&with_genres=${currentGenre}`
          : `${import.meta.env.VITE_API_URL_SERIES}&page=${page}`
      );
      const data = await response.json();
      setMovieList(data.results);
    } catch (error) {
      console.log(error.message);
    }
    console.log(movieList);
  };

  useEffect(() => {
    getData();
  }, [type, page, currentGenre]);

  return (
    <>
      <section className="movies-container flex flex-wrap gap-8 items-center justify-center mt-24 w-350 mb-6 ">
        {movieList.map((movie, index) => {
          return <MovieCard movieObject={movie} key={movie.id || index} />;
        })}
      </section>
    </>
  );
};
