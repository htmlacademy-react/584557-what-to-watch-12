import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PREVIEW_PALY_DELAY_MS } from '../../const';
import { TFilm } from '../../types/film';
import { VideoPlayer } from '../video-player/video-player';

type TFilmCardProps = {
  film: TFilm;
  isActive: boolean;
  setActiveCardId: React.Dispatch<React.SetStateAction<number | null>>;
}

const FilmCard:FC<TFilmCardProps> = ({ film, isActive, setActiveCardId }) => {
  const { name, previewImage, id, previewVideoLink } = film;
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if(isActive) {
      timerId = setTimeout(() => {
        setIsPlaying(true);
      }, PREVIEW_PALY_DELAY_MS);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isActive]);


  return (
    <article
      onMouseEnter={() => {
        setActiveCardId(id);
      }}
      onMouseLeave={() => {
        setActiveCardId(null);
        setIsPlaying(false);
      }}
      className="small-film-card catalog__films-card"
      data-testid="film-card"
    >
      <Link to={`/films/${id}`} className="small-film-card__link">
        <div className="small-film-card__image">
          {
            (!isPlaying) &&
            (<img src={previewImage} alt={name} width="280" height="175"/>)
          }
          {
            (isPlaying) &&
            <VideoPlayer src={previewVideoLink}/>
          }
        </div>
        <h3 className="small-film-card__title">
          {name}
        </h3>
      </Link>
    </article>
  );};

export default FilmCard;
