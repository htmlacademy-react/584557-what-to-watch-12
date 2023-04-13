import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilmsList } from '../../components/films-list/films-list';
import { Footer } from '../../components/footer/footer';
import { GenresList } from '../../components/genres-list/genres-list';
import { Header } from '../../components/header/header';
import { Spinner } from '../../components/spinner/spinner';
import { Error } from '../../components/error/error';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmsAction } from '../../store/api-actions';
import { selectFilmsDataLOadingFailed, selectFilmsDataLOadingStatus } from '../../store/selectors';
import { TFilm } from '../../types/film';

const Main:FC<{ promo: TFilm }> = ({ promo }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilmsAction());
  }, [dispatch]);

  const isFilmsDataLoading = useAppSelector(selectFilmsDataLOadingStatus);
  const isFilmsDataLoadingFailed = useAppSelector(selectFilmsDataLOadingFailed);

  if(isFilmsDataLoading) {
    return <Spinner/>;
  }

  if(isFilmsDataLoadingFailed) {
    return <Error/>;
  }

  const { name, genre, released, posterImage, backgroundImage, id } = promo;
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
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <FilmsList/>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Main;
