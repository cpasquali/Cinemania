export const getNewMovies = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL_NEW_MOVIES);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error.message);
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL_GENRES);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.log(error.message);
  }
};
