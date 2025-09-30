import css from './MovieGrid.module.css';
import { type Movie } from '../../types/movie';
interface MovieGridProps {
  movies: Movie[];
  onSelect: ({
    backdrop_path,
    overview,
    release_date,
    vote_average,
  }: Movie) => void;
}
const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  return (
    <ul className={css.grid}>
      {movies.map(
        ({
          id,
          poster_path,
          title,
          backdrop_path,
          overview,
          release_date,
          vote_average,
        }) => {
          return (
            <li
              key={id}
              onClick={() =>
                onSelect({
                  id,
                  poster_path,
                  title,
                  backdrop_path,
                  overview,
                  release_date,
                  vote_average,
                })
              }>
              <div className={css.card}>
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt={title}
                  loading='lazy'
                />
                <h2 className={css.title}>{title}</h2>
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default MovieGrid;
