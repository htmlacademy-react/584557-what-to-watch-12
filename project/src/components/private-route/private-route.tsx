import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  isAuthorazed: boolean;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { isAuthorazed, children } = props;

  return (
    isAuthorazed
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
