import { useState, useEffect } from "react";

export const MovieCard = ({ movieObject }) => {
  const title = movieObject.title ? movieObject.title : movieObject.name;

  const currentUserInLocalStorage = () => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  };

  const [currentUser] = useState(currentUserInLocalStorage());
  const [favoritesMovies, setFavoritesMovies] = useState([]);

  useEffect(() => {
    const updateFavorites = () => {
      const data = localStorage.getItem(`favorites-${currentUser?.username}`);
      setFavoritesMovies(data ? JSON.parse(data) : []);
    };

    updateFavorites();
    window.addEventListener("favoritesUpdated", updateFavorites);
  }, [currentUser]);

  const addFavoriteMovie = (movie) => {
    const updatedFavorites = [...favoritesMovies, movie];
    localStorage.setItem(
      `favorites-${currentUser.username}`,
      JSON.stringify(updatedFavorites)
    );
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const removeFavoriteMovie = (movie) => {
    const newArray = favoritesMovies.filter((m) =>
      m.title ? m.title !== movie.title : m.name !== movie.name
    );
    localStorage.setItem(
      `favorites-${currentUser.username}`,
      JSON.stringify(newArray)
    );
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const classButton = currentUser
    ? "text-center w-full p-2 bg-black text-white cursor-pointer"
    : "hidden";

  return (
    <article className="flex flex-col items-center w-64 bg-white text-gray-900 border border-gray-300 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      {movieObject.poster_path ? (
        <section className="w-64">
          <img
            className="w-full h-96 object-cover"
            src={`https://image.tmdb.org/t/p/w500/${movieObject.poster_path}`}
            alt={`poster de ${title}`}
          />
          <h2 className="w-full text-lg font-semibold text-center py-4 truncate px-4">
            {title}
          </h2>
          {!favoritesMovies.some((m) =>
            m.title ? m.title === title : m.name === title
          ) ? (
            <button
              className={classButton}
              onClick={() => addFavoriteMovie(movieObject)}
            >
              Agregar a favoritos
            </button>
          ) : (
            <button
              className={classButton}
              onClick={() => removeFavoriteMovie(movieObject)}
            >
              Eliminar de favoritos
            </button>
          )}
        </section>
      ) : (
        <section className="flex flex-col justify-between h-100 w-64 items-center">
          <p className="font-medium m-6 text-center">{title}</p>
          {!favoritesMovies.some((m) =>
            m.title ? m.title === title : m.name === title
          ) ? (
            <button
              className={classButton}
              onClick={() => addFavoriteMovie(movieObject)}
            >
              Agregar a favoritos
            </button>
          ) : (
            <button
              className={classButton}
              onClick={() => removeFavoriteMovie(movieObject)}
            >
              Eliminar de favoritos
            </button>
          )}
        </section>
      )}
    </article>
  );
};
