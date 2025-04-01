import { useEffect, useState } from "react";
import { getGenres } from "../../api/functions-api";
import "./Aside.css";

export const Aside = ({ currentGenre, setCurrentGenre }) => {
  const [genres, setGenres] = useState([]);

  const fetchGenre = async () => {
    const newGenres = await getGenres();
    setGenres(newGenres);
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  return (
    <ul className="h-full fixed left-40 top-20 w-20">
      {genres.map((genre) => {
        return (
          <li
            key={genre.id}
            className={`font-medium  mt-3 cursor-pointer  ${
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
