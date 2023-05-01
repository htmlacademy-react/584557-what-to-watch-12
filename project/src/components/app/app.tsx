import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import Movie from '../../pages/movie/movie';
import NotFound from '../../pages/not-found/not-found';
import Player from '../../pages/player/player';
import SignIn from '../../pages/sign-in/sign-in';
import { AppRoute } from '../../const';
import PrivateRoute from '../../hocs/private-route/private-route';

const App = () => (
  <Routes>
    <Route path={AppRoute.Root}>
      <Route index element={<Main />}/>
      <Route path={AppRoute.Films} element={<Movie/>}/>
      <Route
        path={AppRoute.Rewiew}
        element={
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        }
      />
    </Route>
    <Route path={AppRoute.Player} element={<Player />}/>
    <Route path={AppRoute.Login} element={<SignIn />}/>
    <Route
      path={AppRoute.MyList}
      element={
        <PrivateRoute>
          <MyList/>
        </PrivateRoute>
      }
    />
    <Route path='*' element={<NotFound/>}/>
  </Routes>
);

export default App;
