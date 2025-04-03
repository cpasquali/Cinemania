import { useEffect, useRef, useState } from "react";
import { getGenres } from "../../api/functions-api";
import "./Aside.css";

export const Aside = ({ currentGenre, setCurrentGenre, type }) => {
  const [genres, setGenres] = useState([]);
  const genreContainerRef = useRef(null);

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

  const scrollRight = () => {
    genreContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft = () => {
    genreContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  return (
    <div className="flex gap-10 justify-center items-center">
      <button className="mt-21" onClick={scrollLeft}>
        <ion-icon className="text-xl" name="arrow-back-outline"></ion-icon>
      </button>
      <ul
        className="flex gap-6 w-200 genre-menu mt-18 genre-container overflow-x-hidden transition-transform duration-500 max-md:w-48"
        ref={genreContainerRef}
      >
        {genres.map((genre) => {
          return (
            <li
              key={genre.id}
              className={`flex items-center border-2 border-black font-medium mt-3 cursor-pointer whitespace-nowrap px-4 py-1 rounded-md max-md:w-20 max-md:text-xs max-md:whitespace-normal ${
                currentGenre === genre.id ? "active-genre" : ""
              }`}
              onClick={() => setCurrentGenre(genre.id)}
            >
              <p>{genre.name}</p>
            </li>
          );
        })}
      </ul>
      <button className="mt-21" onClick={scrollRight}>
        <ion-icon className="text-xl" name="arrow-forward-outline"></ion-icon>
      </button>
    </div>
  );
};
