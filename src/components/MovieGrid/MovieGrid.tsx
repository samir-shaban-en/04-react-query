import css from './MovieGrid.module.css';
import { type Movie } from '../../types/movie';
interface GridProp {
  films: Movie[];
}
const MovieGrid = ({ films }: GridProp) => {
  return (
    <ul className={css.grid}>
      {films.map(({ id, poster_path, title }) => {
        return (
          <li key={id}>
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
      })}
    </ul>
  );
};

export default MovieGrid;
