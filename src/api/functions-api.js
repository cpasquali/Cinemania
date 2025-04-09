export const getNewMovies = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL_NEW_MOVIES);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMovieById = async (id) => {
  try {
    const url = import.meta.env.VITE_API_URL_ONE_MOVIE.replace(
      "movie/movie_id",
      `movie/${id}`
    );
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSerieById = async (id) => {
  try {
    const url = import.meta.env.VITE_API_URL_ONE_SERIE.replace(
      "tv/serie_id",
      `tv/${id}`
    );
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getGenres = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.log(error.message);
  }
};
