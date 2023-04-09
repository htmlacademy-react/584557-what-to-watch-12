import { FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { TFilms } from '../../types/film';
import { fromSecToFilmDuration } from '../../utils/time-formatters';

const Player:FC<{ films: TFilms }> = ({ films }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const film = films.find((filmsItem) => filmsItem.id === Number(id));

  if(!film) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  const { videoLink, name, runTime, backgroundImage } = film;
  return (
    <div className="player">
      <video src={videoLink} className="player__video" poster={backgroundImage}/ >

      <button
        onClick={() => {
          navigate(-1);
        }}
        type="button"
        className="player__exit"
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">-{fromSecToFilmDuration(runTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );};

export default Player;
