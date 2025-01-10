import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/auth/modal"; 
import styles from "../../css/Contact.module.css";

const Contact = ({ contactId, name, number, onDelete }) => {
  const dispatch = useDispatch();

  // Funkcja otwierająca modal (przekazujemy contactId)
  const handleDelete = () => {
    // Otwieramy modal, przekazując contactId
    dispatch(openModal(contactId)); 
  };

  return (
    <div className={styles.contactItem}> 
      <span className={styles.contactInfo}>
        {name} {number}
      </span>
      <div className={styles.buttonContainer}>
      <button onClick={handleDelete} className={styles.deleteButton}>
        Delete
      </button>
      </div>
    </div>
  );
};

export default Contact;
