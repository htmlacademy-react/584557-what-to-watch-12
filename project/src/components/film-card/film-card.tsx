import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TFilm } from '../../types/film';

type TFilmCardProps = {
  film: TFilm;
  isActive: boolean;
  setActiveCardId: (id: string) => void;
}

const FilmCard:FC<TFilmCardProps> = ({ film, isActive, setActiveCardId }) => {
  const { name, previewImage, id } = film;
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img
          src={previewImage}
          alt={name}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">
          {name}
        </Link>
      </h3>
    </article>
  );};

export default FilmCard;
