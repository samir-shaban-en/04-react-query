import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieService';

import toast, { Toaster } from 'react-hot-toast';

import { type Movie } from '../../types/movie';
import { useState } from 'react';

function App() {
  const [movies, setFilm] = useState<Movie[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [movie, setCurrentFilm] = useState<Movie | null>(null);

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

  const onSelect = (movie: Movie): void => {
    setCurrentFilm(movie);
  };

  const onClose = () => {
    setCurrentFilm(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {error && <ErrorMessage />}
      {loader && <Loader />}
      <MovieGrid movies={movies} onSelect={onSelect} />
      {movie && <MovieModal onClose={onClose} movie={movie} />}
    </>
  );
}

export default App;
