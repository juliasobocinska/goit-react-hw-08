import { NavLink } from "react-router-dom";
import css from "../../css/Navigation.module.css";

const AuthNav = () => {
  return (
    <div className={css.nav}>
      <NavLink className={css.link} to="/register">
        Register
      </NavLink>
      <NavLink className={css.link} to="/login">
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;
