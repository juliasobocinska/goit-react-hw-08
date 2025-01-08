import { NavLink } from "react-router-dom";
import css from "../../css/Navigation.module.css";
import clsx from "clsx";

const buildLink = ({ isActive }) => {
  return clsx(css.home, isActive && css.active);
};

export default function AuthNav() {
  return (
    <div className={css.div}>
      <NavLink to="/register" className={buildLink}>
        Register
      </NavLink>
      <NavLink to="/login" className={buildLink}>
        Login
      </NavLink>
    </div>
  );
}