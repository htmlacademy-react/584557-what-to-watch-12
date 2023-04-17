import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children } : PrivateRouteProps) {
  const isAuthorazed = AuthorizationStatus.Auth === useAppSelector(selectAuthorizationStatus);

  return (
    isAuthorazed
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
