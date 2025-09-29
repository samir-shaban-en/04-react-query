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
  const [films, setFilm] = useState<Movie[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentFilm, setCurrentFilm] = useState<Movie>({
    backdrop_path: 'path',
    title: 'movie-name',
    overview: 'overview',
    release_date: 'release_date',
    vote_average: 0,
  });

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

  const currentFilmClick = (film: Movie): void => {
    setCurrentFilm(film);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {error && <ErrorMessage />}
      {loader && <Loader />}
      <MovieGrid films={films} currentFilmClick={currentFilmClick} />
      {isModalOpen && (
        <MovieModal closeModal={closeModal} currentFilm={currentFilm} />
      )}
    </>
  );
}

export default App;
