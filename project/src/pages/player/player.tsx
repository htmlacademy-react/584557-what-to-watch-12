import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fromSecToFilmDuration } from '../../utils/date-time-formatters';
import { Spinner } from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Error } from '../../components/error/error';
import { fetchActiveFilmAction } from '../../store/api-actions';
import { selectActiveFilm } from '../../store/acive-film/selectors';

const Player = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispath(fetchActiveFilmAction(Number(id)));
  }, [dispath, id]);

  const { data, isLoading, error } = useAppSelector(selectActiveFilm);

  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    currentTime: 0,
    loading: false,
    error: false
  });

  const { isPlaying, loading, error: videoLoadError, currentTime } = playerState;

  if(isLoading) {
    return <Spinner/>;
  }

  if(error) {
    return <Error/>;
  }

  if(data === null) {
    return null;
  }

  if(!id || (!data && !isLoading)) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  const onFullScreenBtnClick = () => {
    if(wrapperRef.current) {
      if (!document.fullscreenElement) {
        wrapperRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const onPlayBtnClick = () => {
    if(videoRef.current) {
      if(isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const onVideoLoadStart = () => {
    setPlayerState((state) => ({
      ...state,
      loading: true
    }));
  };

  const onVideoPlay = () => {
    setPlayerState((state) => ({
      ...state,
      isPlaying: true
    }));
  };

  const onVideoPaused = () => {
    setPlayerState((state) => ({
      ...state,
      isPlaying: false
    }));
  };

  const onVideoCanPlay = () => {
    setPlayerState((state) => ({
      ...state,
      loading: false
    }));

    videoRef.current?.play();
  };

  const onVideoEror = () => {
    setPlayerState((state) => ({
      ...state,
      error: true
    }));
  };

  const onVideoTimeUpdate = () => {
    if(videoRef.current && videoRef.current.currentTime) {
      if(videoRef.current.currentTime !== currentTime){
        setPlayerState((state) => ({
          ...state,
          currentTime: videoRef?.current?.currentTime || 0
        }));
      }
    }
  };

  const { film: { videoLink, name, runTime, backgroundImage } } = data;
  const progress = Math.round((currentTime / runTime) * 100);

  return (
    <div className="player" ref={wrapperRef}>
      { videoLoadError && <h2>Video Load Error!</h2> }
      { loading && <h2>Spinner time!</h2> }

      <video onTimeUpdate={onVideoTimeUpdate} onLoadStart={onVideoLoadStart} onError={onVideoEror} onCanPlay={onVideoCanPlay} onPlay={onVideoPlay} onPause={onVideoPaused} ref={videoRef} src={videoLink} className="player__video" poster={backgroundImage} muted/>

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
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">-{fromSecToFilmDuration(runTime - currentTime)}</div>
        </div>

        <div className="player__controls-row">
          <button onClick={onPlayBtnClick} type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{name}</div>

          <button onClick={onFullScreenBtnClick} type="button" className="player__full-screen">
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
