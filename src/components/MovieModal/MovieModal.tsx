import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import { type Movie } from '../../types/movie';
import { useEffect } from 'react';
interface MovieModalProps {
  currentFilm: Movie;
  closeModal: () => void;
}

const MovieModal = ({
  currentFilm: { backdrop_path, release_date, vote_average, title, overview },
  closeModal,
}: MovieModalProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [closeModal]);

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
          onClick={closeModal}>
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
