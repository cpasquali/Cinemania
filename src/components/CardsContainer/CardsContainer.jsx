import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import "./CardsContainer.css";

export const CardsContainer = ({ type, page, currentGenre, searchMovie }) => {
  const [movieList, setMovieList] = useState([]);

  const getData = async () => {
    const apiUrl =
      type === "movie"
        ? `${
            import.meta.env.VITE_API_URL_MOVIES
          }&page=${page}&with_genres=${currentGenre}`
        : `${
            import.meta.env.VITE_API_URL_SERIES
          }&page=${page}&with_genres=${currentGenre}`;

    try {
      const response = await fetch(
        searchMovie && type === "movie"
          ? `${
              import.meta.env.VITE_API_URL_MOVIES_BY_NAME
            }&query=${searchMovie}`
          : searchMovie && type === "serie"
          ? `${
              import.meta.env.VITE_API_URL_SERIES_BY_NAME
            }&query=${searchMovie}`
          : apiUrl
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
  }, [type, page, currentGenre, searchMovie]);

  return (
    <>
      <section className="movies-container flex flex-wrap gap-8 items-center justify-center mt-10 w-350 mb-6 ">
        {movieList.map((movie, index) => {
          return <Card movieObject={movie} key={movie.id || index} />;
        })}
      </section>
    </>
  );
};
