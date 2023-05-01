import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectUserDataState } from '../../store/user-data/selectors';
import { Spinner } from '../../components/spinner/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children } : PrivateRouteProps) {
  const { isLoading, authorizationStatus } = useAppSelector(selectUserDataState);
  const isAuthorazed = AuthorizationStatus.Auth === authorizationStatus;

  if(isLoading) {
    return <Spinner/>;
  }

  return (
    isAuthorazed
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
