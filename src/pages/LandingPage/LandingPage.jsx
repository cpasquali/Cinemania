import "./LandingPage.css";
import React, { useEffect, useState } from "react";
import { getNewMovies } from "../../api/functions-api";
import { Link } from "wouter";
import { succesMessage } from "../../utils/toastMessagesFunctions";

export const LandingPage = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const newMovies = await getNewMovies();
    const limitedMovies = newMovies.slice(0, 7);
    setMovies(limitedMovies);
  };

  useEffect(() => {
    fetchMovies();
    const message = localStorage.getItem("loginMessage");
    if (message) {
      setTimeout(() => {
        succesMessage(message);
      }, 50);
      localStorage.removeItem("loginMessage");
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      <section className="relative bg-cover bg-center py-32 banner-landing">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4">Bienvenidos a CineMania</h1>
          <p className="text-lg mb-8">
            Explora los mejores estrenos, clásicos y más. ¡Encuentra tu próxima
            película favorita!
          </p>
          <a
            href="#movies"
            className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold"
          >
            Explorar Películas
          </a>
        </div>
      </section>
      <section id="movies" className="py-10 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-8">
            Nuevos estrenos
          </h2>
          <div className="flex flex-wrap justify-center gap-8 card-container">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative group card-landing min-md:w-86 self-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt="Movie Poster"
                  className="w-full h-60 object-cover rounded-lg transition duration-300 "
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-90 bg-black bg-opacity-50 transition duration-300 ">
                  <p className="text-white font-semibold text-xl">
                    {movie.title}
                  </p>
                </div>
              </div>
            ))}
            <div className="relative group rounded-lg bg-black flex items-center justify-center w-70 self-center min-md:w-86 min-md:h-60 ">
              <Link
                to="/list"
                className="rounded-md px-3 py-2 font-medium text-xl"
              >
                Ver mas peliculas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
