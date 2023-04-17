import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { MovieTabs } from '../../components/movie-tabs/movie-tabs';
import { Spinner } from '../../components/spinner/spinner';
import { Error } from '../../components/error/error';
import { AppRoute, MAX_RELATED_MOVIES_LIST_LENGTH, MovieTab } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchActiveFilmAction } from '../../store/api-actions';
import { selectActiveFilm, selectActiveFilmDataLoadingFailed, selectActiveFilmsDataLoadingStatus } from '../../store/selectors';
import { Footer } from '../../components/footer/footer';
import { FilmsList } from '../../components/films-list/films-list';

const Movie = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { id, tabName } = useParams<{ id: string; tabName: MovieTab }>();

  useEffect(() => {
    dispath(fetchActiveFilmAction(Number(id)));
  }, [dispath, id]);

  const activeFilm = useAppSelector(selectActiveFilm);
  const isLoading = useAppSelector(selectActiveFilmsDataLoadingStatus);
  const isLoadingFalled = useAppSelector(selectActiveFilmDataLoadingFailed);

  if(isLoading) {
    return <Spinner/>;
  }

  if(isLoadingFalled) {
    return <Error/>;
  }

  if(activeFilm === null) {
    return null;
  }

  if(!id || (!activeFilm && !isLoading)) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  const { film, similarFilms, filmComments } = activeFilm;
  const { backgroundImage, name, genre, posterImage, released, isFavorite, backgroundColor } = film;
  const addReviewPagePath = tabName ? `${pathname.replace(`/${tabName}`, '')}/review` : `${pathname}/review`;

  return (
    <>
      <section className="film-card film-card--full" style={{backgroundColor: backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header additionalClassName='film-card__head' />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  onClick={() => {
                    navigate(`/player/${id}`);
                  }}
                  className="btn btn--play film-card__button" type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <button
                  onClick={() => {
                    navigate(addReviewPagePath);
                  }}
                  className="btn film-card__button"
                >
                  Add review
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <MovieTabs activeTab={tabName || MovieTab.Overview} film={film} filmComments={filmComments}/>
          </div>
        </div>
      </section>

      {
        similarFilms.length && (
          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <FilmsList maxRenderedItems={MAX_RELATED_MOVIES_LIST_LENGTH} films={similarFilms}/>
            </section>

            <Footer />
          </div>
        )
      }
    </>
  );};

export default Movie;
