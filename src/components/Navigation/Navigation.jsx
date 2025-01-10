import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import css from "../../css/Navigation.module.css";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser); 

  return (
    <nav className={css.nav}>
      <NavLink className={css.home} to="/" end>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={css.link} to="/tasks">
          Tasks
        </NavLink>
      )}
      {isLoggedIn && (
        <span className={css.welcomeMsg}>
          Welcome, {user?.email || 'No email provided'}
        </span>
      )}
    </nav>
  );
};

export default Navigation;
