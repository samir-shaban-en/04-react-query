import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import { type Movie } from '../../types/movie';
import { useState, useEffect } from 'react';

function App() {
  const [films, setFilm] = useState<Movie[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (topic: string) => {
    try {
      setError(false);
      setLoader(true);
      const moviesArray = await fetchMovies(topic);
      setLoader(false);

      if (moviesArray.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setFilm(moviesArray);
    } catch (errorMessage) {
      console.log(errorMessage);
      setLoader(false);
      setError(true);
    }
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {error && <ErrorMessage />}
      {loader && <Loader />}
      <MovieGrid films={films} />
    </>
  );
}

export default App;
