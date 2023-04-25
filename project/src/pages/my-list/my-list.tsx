import { useEffect } from 'react';
import { FilmsList } from '../../components/films-list/films-list';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Spinner } from '../../components/spinner/spinner';
import { Error } from '../../components/error/error';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesFilmsAction } from '../../store/api-actions';
import { selectFavoritesFilmsState } from '../../store/favorites-films/selectors';

const MyList = () => {
  const dispatch = useAppDispatch();

  const { data: favoritesFilms, isLoading, error } = useAppSelector(selectFavoritesFilmsState);

  useEffect(() => {
    dispatch(fetchFavoritesFilmsAction());
  }, [dispatch]);

  if(isLoading) {
    return <Spinner/>;
  }

  if(error) {
    return <Error/>;
  }

  return (
    <div className="user-page">
      <Header additionalClassName='user-page__head'>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoritesFilms.length}</span></h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        {Boolean(favoritesFilms.length) && <h3>Nothing here!</h3>}
        {Boolean(favoritesFilms.length) && <FilmsList films={favoritesFilms} />}
      </section>

      <Footer />
    </div>
  );
};

export default MyList;
