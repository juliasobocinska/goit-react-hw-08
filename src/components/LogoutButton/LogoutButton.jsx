import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import styles from "../../css/ContactList.module.css"; 

const LogoutButton = () => {
  const dispatch = useDispatch();

  // Funkcja do wylogowania
  const handleLogout = () => {
    dispatch(logOut()); 
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
};

export default LogoutButton;
