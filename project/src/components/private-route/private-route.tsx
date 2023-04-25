import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectUserDataState } from '../../store/user-data/selectors';
import { Spinner } from '../spinner/spinner';
import { Error } from '../error/error';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children } : PrivateRouteProps) {
  const { isLoading, error, authorizationStatus } = useAppSelector(selectUserDataState);
  const isAuthorazed = AuthorizationStatus.Auth === authorizationStatus;

  if(isLoading) {
    return <Spinner/>;
  }

  if(error) {
    return <Error/>;
  }

  return (
    isAuthorazed
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
