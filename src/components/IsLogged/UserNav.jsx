import css from "../../css/Navigation.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/operations";
import { selectUser } from "../../redux/selectors";

const buildLink = ({ isActive }) => {
  return clsx(css.home, isActive && css.active);
};

export default function UserNav() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.div}>
      <p className={css.welcome}>Welcome, {user.name}</p>
      <button className={css.button} onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
}