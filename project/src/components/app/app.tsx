import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import Movie from '../../pages/movie/movie-page';
import NotFound from '../../pages/not-found/not-found';
import Player from '../../pages/player/player';
import SignIn from '../../pages/sign-in/sign-in';
import { TFilm } from '../../types/film';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppSelector } from '../../hooks';
import { selectAllFilms, selectFilmsDataLOadingFailed, selectFilmsDataLOadingStatus } from '../../store/selectors';
import { Spinner } from '../spinner/spinner';
import { Error } from '../error/error';

const App:FC<{promo: TFilm}> = ({ promo }) => {
  const isFilmsDataLoading = useAppSelector(selectFilmsDataLOadingStatus);
  const isFilmsDataLoadingFailed = useAppSelector(selectFilmsDataLOadingFailed);
  const films = useAppSelector(selectAllFilms);

  if(isFilmsDataLoading) {
    return <Spinner/>;
  }

  if(isFilmsDataLoadingFailed) {
    return <Error/>;
  }


  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main promo={promo} films={films} />}/>
          <Route path={AppRoute.Films} element={<Movie films={films}/>}/>
          <Route
            path={AppRoute.Rewiew}
            element={
              <PrivateRoute isAuthorazed>
                <AddReview films={films}/>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path={AppRoute.Player} element={<Player films={films}/>}/>
        <Route path={AppRoute.Login} element={<SignIn />}/>
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute isAuthorazed={false}>
              <MyList films={films}/>
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );};

export default App;
