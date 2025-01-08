import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../src/redux/auth/selectors';

export const PrivateRoute = ({ children, redirectTo = '/' }) => {
  // Odczytujemy stan isLoggedIn z redux
  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log('isLoggedIn (PrivateRoute):', isLoggedIn);  

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};
