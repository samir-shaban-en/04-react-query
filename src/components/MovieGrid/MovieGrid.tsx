import css from './MovieGrid.module.css';
import { type Movie } from '../../types/movie';
interface MovieGridProps {
  films: Movie[];
  handelClick: ({
    backdrop_path,
    overview,
    release_date,
    vote_average,
  }: Movie) => void;
}
const MovieGrid = ({ films, handelClick }: MovieGridProps) => {
  return (
    <ul className={css.grid}>
      {films.map(
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
                handelClick({
                  backdrop_path,
                  overview,
                  release_date,
                  vote_average,
                  title,
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
