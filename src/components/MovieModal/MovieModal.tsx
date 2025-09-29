import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import { type Movie } from '../../types/movie';
import { useEffect } from 'react';
interface MovieModalProps {
  currentFilm: Movie;
  onClose: () => void;
}

const MovieModal = ({
  currentFilm: { backdrop_path, release_date, vote_average, title, overview },
  onClose,
}: MovieModalProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role='dialog'
      aria-modal='true'>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label='Close modal'
          onClick={onClose}>
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt='movie_title'
          className={css.image}
        />
        <div className={css.content}>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>
            <strong>Release Date:</strong> {release_date}
          </p>
          <p>
            <strong>Rating:</strong> {vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MovieModal;
