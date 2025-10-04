import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieService';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { type Movie } from '../../types/movie';

function App() {
  const [movie, setCurrentFilm] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['articles', topic, currentPage],
    queryFn: () => fetchMovies(topic, currentPage),
    enabled: topic !== '',
    placeholderData: keepPreviousData,
  });

  const onSubmit = async (topic: string) => {
    setTopic(topic);
    setCurrentPage(1);
  };

  const onSelect = (movie: Movie): void => {
    setCurrentFilm(movie);
  };

  const onClose = () => {
    setCurrentFilm(null);
  };

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data]);
  const totalPages = data?.total_pages ?? 0;
  return (
    <>
      <Toaster />
      {data && data.results.length > 0 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel='→'
          previousLabel='←'
        />
      )}
      <SearchBar onSubmit={onSubmit} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {data && <MovieGrid movies={data.results} onSelect={onSelect} />}
      {movie && <MovieModal onClose={onClose} movie={movie} />}
    </>
  );
}

export default App;
