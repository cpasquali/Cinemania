import { useEffect, useRef, useState } from "react";
import { getGenres } from "../../api/functions-api";
import "./GenreScrollBar.css";

export const GenreScrollBar = ({ currentGenre, setCurrentGenre, type }) => {
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
    <div className="flex justify-center items-center min-md:gap-10">
      <button
        className="hidden min-lg:flex justify-center items-center mt-21 border-2 border-black rounded-full p-1 px-2 py-2 hover:bg-black hover:text-white transition-all"
        onClick={scrollLeft}
      >
        <ion-icon className="text-xl" name="arrow-back-outline"></ion-icon>
      </button>
      <ul
        className="flex overflow-x-scroll min-md:gap-6 w-200 genre-menu mt-18 genre-container min-lg:overflow-x-hidden transition-transform duration-500 max-lg:w-80 max-lg:border-1"
        ref={genreContainerRef}
      >
        {genres.map((genre) => {
          return (
            <li
              key={genre.id}
              className={`flex items-center border-2 max-lg:border-0 border-black font-medium mt-3 max-lg:m-0 max-lg:rounded-none cursor-pointer whitespace-nowrap px-4 py-1 rounded-lg max-lg:w-20 max-lg:text-xs max-lg:whitespace-normal max-sm:p-4 ${
                currentGenre === genre.id ? "active-genre" : ""
              }`}
              onClick={() => setCurrentGenre(genre.id)}
            >
              <p className="max-sm:truncate">{genre.name}</p>
            </li>
          );
        })}
      </ul>
      <button
        className="hidden min-lg:flex justify-center items-center mt-21 border-2 border-black rounded-full p-1 px-2 py-2 hover:bg-black hover:text-white transition-all"
        onClick={scrollRight}
      >
        <ion-icon className="text-xl" name="arrow-forward-outline"></ion-icon>
      </button>
    </div>
  );
};
