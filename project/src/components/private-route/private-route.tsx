import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAuth } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children } : PrivateRouteProps) {
  const isAuthorazed = useAuth();

  return (
    isAuthorazed
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
