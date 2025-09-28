import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import toast, { Toaster } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import { type Movie } from '../../types/movie';
import { useState } from 'react';
import Loader from '../Loader/Loader';
function App() {
  const [films, setFilm] = useState<Movie[]>([]);

  const onSubmit = async (topic: string) => {
    try {
      const moviesArray = await fetchMovies(topic);
      if (moviesArray.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setFilm(moviesArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      <Loader />
      <MovieGrid films={films} />
    </>
  );
}

export default App;
