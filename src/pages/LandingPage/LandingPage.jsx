import "./LandingPage.css";
import React, { useState } from "react";
import { getNewMovies, getGenres } from "../../api/functions-api";
import { Link } from "wouter";

export const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchMovies = async () => {
    const newMovies = await getNewMovies();
    const limitedMovies = newMovies.slice(0, 7);
    setMovies(limitedMovies);
  };

  const fetchGenre = async () => {
    const newGenres = await getGenres();
    setGenres(newGenres);
  };

  useState(() => {
    fetchMovies();
    fetchGenre();
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 card-container">
            {movies.map((movie) => (
              <div key={movie.id} className="relative group card">
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
            <div className="relative group rounded-lg bg-black flex items-center justify-center">
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
