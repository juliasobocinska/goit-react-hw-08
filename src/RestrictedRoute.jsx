import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../src/redux/auth/selectors';

export const RestrictedRoute = ({ children, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log('isLoggedIn:', isLoggedIn);

 return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};
