import { useState, useEffect } from "react";
import { succesMessage } from "../../utils/toastMessagesFunctions";
import { Link } from "wouter";
export const Card = ({ movieObject }) => {
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
    succesMessage("Pelicula agregada con exito!!");
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
    succesMessage("Pelicula eliminada con exito!!");
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const classButton = currentUser
    ? "text-center w-full p-2 bg-black text-white cursor-pointer"
    : "hidden";

  return (
    <article className="flex flex-col items-center w-64 bg-white text-gray-900 border border-gray-300 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      {movieObject.poster_path ? (
        <section className="w-64">
          <Link to={`/movie/${movieObject.id}`}>
            <img
              className="w-full h-96 object-cover"
              src={`https://image.tmdb.org/t/p/w500/${movieObject.poster_path}`}
              alt={`poster de ${title}`}
            />
            <h2 className="w-full text-lg font-semibold text-center py-4 truncate px-4">
              {title}
            </h2>
          </Link>
          {!favoritesMovies.some((m) =>
            m.title ? m.title === title : m.name === title
          ) ? (
            <button
              className={classButton}
              onClick={(e) => {
                e.stopPropagation();
                addFavoriteMovie(movieObject);
              }}
            >
              Agregar a favoritos
            </button>
          ) : (
            <button
              className={classButton}
              onClick={(e) => {
                e.stopPropagation();
                removeFavoriteMovie(movieObject);
              }}
            >
              Eliminar de favoritos
            </button>
          )}
        </section>
      ) : (
        <section className="flex flex-col justify-between h-100 w-64 items-center">
          <Link to={`/movie/${movieObject.id}`}>
            <p className="font-medium m-6 text-center">{title}</p>
          </Link>

          {!favoritesMovies.some((m) =>
            m.title ? m.title === title : m.name === title
          ) ? (
            <button
              className={classButton}
              onClick={(e) => {
                e.stopPropagation();
                addFavoriteMovie(movieObject);
              }}
            >
              Agregar a favoritos
            </button>
          ) : (
            <button
              className={classButton}
              onClick={(e) => {
                e.stopPropagation();
                removeFavoriteMovie(movieObject);
              }}
            >
              Eliminar de favoritos
            </button>
          )}
        </section>
      )}
    </article>
  );
};
