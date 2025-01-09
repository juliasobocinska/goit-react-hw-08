import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import css from "../../css/Navigation.module.css";

export default function UserNav() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  if (!user) {
    return null; 
  }

  return (
    <div className={css.div}>
      <p className={css.welcome}>Welcome, {user.name}</p>
      <button className={css.button} onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
}
