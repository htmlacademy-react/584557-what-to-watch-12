import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { selectAuthorizationStatus, selectUserData } from '../../store/user-data/selectors';
import { Logo } from '../logo/logo';

export const Header:FC<{
  additionalClassName?: string;
  children?: ReactNode | undefined;
}> = ({ additionalClassName, children }) => {
  const dispatch = useAppDispatch();
  const isAuthorazed = AuthorizationStatus.Auth === useAppSelector(selectAuthorizationStatus);
  const avatarUrl = useAppSelector(selectUserData)?.avatarUrl;

  const handleLogoutLinkClick = () => {
    dispatch(logoutAction());
  };

  return (
    <header className={`page-header ${additionalClassName ?? ''}`} data-testid="header">
      <Logo />

      { children }

      {!isAuthorazed && (
        <div className="user-block">
          <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
        </div>
      )}

      {isAuthorazed && (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <Link to={AppRoute.MyList}>
                <img
                  src={avatarUrl}
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </Link>
            </div>
          </li>
          <li className="user-block__item">
            <Link to={AppRoute.Login} onClick={handleLogoutLinkClick} className="user-block__link">Sign out</Link>
          </li>
        </ul>
      )}
    </header>
  );};
