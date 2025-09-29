const myKey = import.meta.env.VITE_API_KEY;
import axios from 'axios';
import { type Movie } from '../types/movie';
const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${myKey}`,
  },
};

interface Movies {
  results: Movie[];
}

const fetchMovies = async (topic: string): Promise<Movie[]> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${topic}&include_adult=false&language=en-US&page=1`;

  const apiRequest = await axios.get<Movies>(url, options);
  const filteredFilms = apiRequest.data.results.filter(
    (film) => film.backdrop_path && film.poster_path
  );

  return filteredFilms;
};

export default fetchMovies;
