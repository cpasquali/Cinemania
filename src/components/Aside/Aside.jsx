import { useEffect, useState } from "react";
import { getGenres } from "../../api/functions-api";
import "./Aside.css";

export const Aside = ({ currentGenre, setCurrentGenre, type }) => {
  const [genres, setGenres] = useState([]);

  const fetchGenre = async () => {
    const newGenres = await getGenres(
      type === "movie"
        ? import.meta.env.VITE_API_URL_GENRES_MOVIES
        : import.meta.env.VITE_API_URL_GENRES_SERIES
    );
    setGenres(newGenres);
  };

  useEffect(() => {
    fetchGenre();
  }, [type]);

  return (
    <ul className="h-full fixed left-40 top-20 w-20">
      {genres.map((genre) => {
        return (
          <li
            key={genre.id}
            className={`font-medium  mt-3 cursor-pointer w-50 ${
              currentGenre === genre.id ? "active-genre" : ""
            }`}
            onClick={() => setCurrentGenre(genre.id)}
          >
            <p>{genre.name}</p>
          </li>
        );
      })}
    </ul>
  );
};
