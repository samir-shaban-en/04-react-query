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
  total_pages: number;
  results: Movie[];
}

const fetchMovies = async (
  topic: string,
  currentPage: number
): Promise<Movies> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${topic}&include_adult=false&language=en-US&page=${currentPage}`;

  const apiRequest = await axios.get<Movies>(url, options);

  const total_pages = apiRequest.data.total_pages;
  const results = apiRequest.data.results.filter(
    (film) => film.backdrop_path && film.poster_path
  );

  return { results, total_pages };
};

export default fetchMovies;
