import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilmsList } from '../../components/films-list/films-list';
import { Footer } from '../../components/footer/footer';
import { GenresList } from '../../components/genres-list/genres-list';
import { Header } from '../../components/header/header';
import { Spinner } from '../../components/spinner/spinner';
import { Error } from '../../components/error/error';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteFilmStatusAction, fetchFavoritesFilmsAction, fetchFilmsAction, fetchPromoFilmAction } from '../../store/api-actions';
import { selectFilmsByGenre, selectFilmsState } from '../../store/films/selectors';
import { ShowMore } from '../../components/show-more/show-more';
import { AuthorizationStatus, MAX_FILMS_PER_PAGE } from '../../const';
import { FavoriteFilmBtn } from '../../components/favorite-film-btn/favorite-film-btn';
import { selectAuthorizationStatus } from '../../store/user-data/selectors';
import { selectFavoritesFilms } from '../../store/favorites-films/selectors';
import { selectPromoFilm } from '../../store/promo-film/selectors';

const Main:FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading: isFilmsLoading, error: isFilmsLoadingError, activeGenre } = useAppSelector(selectFilmsState);
  const isAuthorize = useAppSelector(selectAuthorizationStatus) === AuthorizationStatus.Auth;
  const filteredFilms = useAppSelector(selectFilmsByGenre);
  const { data: promoFilm, isLoading: isPromoFilmLoading, error: isPromoFilmLoadingError } = useAppSelector(selectPromoFilm);
  const favoritesFilmsCount = useAppSelector(selectFavoritesFilms).length;

  const [filmsListPage, setFilmsListPage] = useState(1);

  useEffect(() => {
    dispatch(fetchFilmsAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFavoritesFilmsAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  useEffect(() => {
    setFilmsListPage(1);
  }, [activeGenre]);

  const filmsAmountForRender = filmsListPage * MAX_FILMS_PER_PAGE;
  const isLoading = isFilmsLoading || isPromoFilmLoading;
  const isError = isFilmsLoadingError || isPromoFilmLoadingError;

  if(isLoading) {
    return <Spinner/>;
  }

  if(isError) {
    return <Error/>;
  }

  if(promoFilm === null) {
    return null;
  }

  const isShowMoreBtnHidden = filteredFilms.length < filmsAmountForRender;

  const { name, genre, released, posterImage, backgroundImage, id, isFavorite } = promoFilm;

  const handlefavoriteBntClick = () => {
    dispatch(changeFavoriteFilmStatusAction({ status: Number(!isFavorite), filmId: id }));
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src={backgroundImage}
            alt={name}
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header additionalClassName='film-card__head' />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={posterImage}
                alt={`${name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  onClick={() => {
                    navigate(`player/${id}`);
                  }}
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>

                { isAuthorize && <FavoriteFilmBtn handleClick={handlefavoriteBntClick} isActive={isFavorite} counter={favoritesFilmsCount}/> }
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog" data-testid="main-page">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <FilmsList films={filteredFilms} maxRenderedItems={filmsAmountForRender} />
          {!isShowMoreBtnHidden && <ShowMore handleClick={() => setFilmsListPage((s) => s + 1)}/>}
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Main;
