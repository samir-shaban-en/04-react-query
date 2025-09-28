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
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const fetchMovies = async (topic: string): Promise<Movie[]> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${topic}&include_adult=false&language=en-US&page=1`;

  const apiRequest = await axios.get<Movies>(url, options);

  console.log(apiRequest.data.results);
  return apiRequest.data.results;
};

export default fetchMovies;
