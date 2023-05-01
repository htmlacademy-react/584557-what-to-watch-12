import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fromSecToFilmDuration } from '../../utils/date-time-formatters';
import { Spinner } from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchActiveFilmAction } from '../../store/api-actions';
import { selectActiveFilm } from '../../store/active-film/selectors';

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
    isFullscreen: false,
    loading: false,
    error: false
  });

  const { isPlaying, loading, error: videoLoadError, currentTime, isFullscreen } = playerState;

  if(isLoading) {
    return <Spinner/>;
  }

  if(error) {
    <Navigate to={AppRoute.NotFound}/>;
  }

  if(data === null) {
    return null;
  }

  const turnOffFullScreen = () => {
    document.exitFullscreen();
    setPlayerState((state) => ({
      ...state,
      isFullscreen: false
    }));
  };

  const setFullScreen = () => {
    if(wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
      setPlayerState((state) => ({
        ...state,
        isFullscreen: true
      }));
    }
  };

  const handleFullScreenBtnClick = () => {
    if(wrapperRef.current) {
      if(document.fullscreenElement === undefined) {
        if(isFullscreen) {
          turnOffFullScreen();
        } else {
          setFullScreen();
        }
      } else if (document.fullscreenElement === null) {
        setFullScreen();
      } else {
        turnOffFullScreen();
      }
    }
  };

  const handlePlayBtnClick = () => {
    if(videoRef.current) {
      if(isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleVideoLoadStart = () => {
    setPlayerState((state) => ({
      ...state,
      loading: true
    }));
  };

  const handleVideoPlay = () => {
    setPlayerState((state) => ({
      ...state,
      isPlaying: true
    }));
  };

  const handleVideoPaused = () => {
    setPlayerState((state) => ({
      ...state,
      isPlaying: false
    }));
  };

  const handleVideoCanPlay = () => {
    setPlayerState((state) => ({
      ...state,
      loading: false
    }));

    playerState.isPlaying && videoRef.current?.play();
  };

  const handleVideoWaiting = () => {
    setPlayerState((state) => ({
      ...state,
      loading: true
    }));
  };

  const handleVideoEror = () => {
    setPlayerState((state) => ({
      ...state,
      error: true
    }));
  };

  const handleVideoTimeUpdate = () => {
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
    <div className="player" ref={wrapperRef} data-testid="player-page">
      { videoLoadError && <h2>Video Load Error!</h2> }
      { loading && (
        <svg className="spinner" viewBox="0 0 50 50" data-testid="animated-spinner">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
      ) }

      <video
        data-testid="video"
        onWaiting={handleVideoWaiting}
        onTimeUpdate={handleVideoTimeUpdate}
        onLoadStart={handleVideoLoadStart}
        onError={handleVideoEror}
        onCanPlay={handleVideoCanPlay}
        onPlay={handleVideoPlay}
        onPause={handleVideoPaused}
        ref={videoRef}
        src={videoLink}
        className="player__video"
        poster={backgroundImage}
        autoPlay
        muted
      />

      <button
        onClick={() => {
          navigate(`/${AppRoute.Films}`.replace(':id', String(id)).replace(':tabName', ''));
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
          <button onClick={handlePlayBtnClick} type="button" className="player__play" data-testid="play-btn">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{name}</div>

          <button onClick={handleFullScreenBtnClick} type="button" className="player__full-screen" data-testid="full-screen-btn">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>{isFullscreen ? 'Turn off fullscreen mode' : 'Full screen'}</span>
          </button>
        </div>
      </div>
    </div>
  );};

export default Player;
