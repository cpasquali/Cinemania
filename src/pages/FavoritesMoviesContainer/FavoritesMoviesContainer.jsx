import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import "./FavoritesMovies.css";

export const FavoritesMoviesContainer = () => {
  const currentUserInLocalStorage = () => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  };

  const [currentUser] = useState(currentUserInLocalStorage());

  const favoritesMoviesInLocalStorage = () => {
    if (!currentUser) return [];
    const data = localStorage.getItem(`favorites-${currentUser.username}`);
    return data ? JSON.parse(data) : [];
  };

  const [favoritesMovies, setFavoritesMovies] = useState(
    favoritesMoviesInLocalStorage()
  );
  const [showContent, setShowContent] = useState(favoritesMovies);

  useEffect(() => {
    const updateFavorites = () => {
      const storedFavorites = favoritesMoviesInLocalStorage();
      setFavoritesMovies(storedFavorites);
      setShowContent(storedFavorites);
    };

    window.addEventListener("favoritesUpdated", updateFavorites);
    return () =>
      window.removeEventListener("favoritesUpdated", updateFavorites);
  }, [currentUser]);

  const filterMovies = (type) => {
    if (type === "all") {
      setShowContent(favoritesMovies);
    } else if (type === "movies") {
      setShowContent(favoritesMovies.filter((m) => m.hasOwnProperty("title")));
    } else if (type === "series") {
      setShowContent(favoritesMovies.filter((m) => m.hasOwnProperty("name")));
    }
  };

  return (
    <section>
      <div className="flex gap-4 justify-center my-4 radios-container mt-20">
        <label className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-200 text-black rounded-lg border-2 border-transparent transition-all hover:border-black radio">
          <input
            type="radio"
            name="filter"
            value="all"
            onChange={() => filterMovies("all")}
            defaultChecked
            className="hidden peer"
          />
          <span className="w-4 h-4 border-2 border-black rounded-full flex items-center justify-center peer-checked:bg-black peer-checked:border-black">
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </span>
          Todas
        </label>

        <label className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-200 text-black rounded-lg border-2 border-transparent transition-all hover:border-black radio">
          <input
            type="radio"
            name="filter"
            value="movies"
            onChange={() => filterMovies("movies")}
            className="hidden peer"
          />
          <span className="w-4 h-4 border-2 border-black rounded-full flex items-center justify-center peer-checked:bg-black peer-checked:border-black">
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </span>
          Películas
        </label>

        <label className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-200 text-black rounded-lg border-2 border-transparent transition-all hover:border-black radio">
          <input
            type="radio"
            name="filter"
            value="series"
            onChange={() => filterMovies("series")}
            className="hidden peer"
          />
          <span className="w-4 h-4 border-2 border-black rounded-full flex items-center justify-center peer-checked:bg-black peer-checked:border-black">
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </span>
          Series
        </label>
      </div>

      {showContent.length > 0 ? (
        <div className="movies-container flex flex-wrap gap-8 items-center justify-center mt-6 w-350 mb-6 favorites-movies-container">
          {showContent.map((movie, index) => (
            <Card movieObject={movie} key={movie.id || index} />
          ))}
        </div>
      ) : (
        <h2 className="text-center mt-9 font-medium text-xl">
          Todavía no se agregaron películas ni series favoritas
        </h2>
      )}
    </section>
  );
};
