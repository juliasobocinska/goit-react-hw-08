import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../redux/auth/modal"; 
import { logOut } from "../../redux/auth/operations"; 
import Contact from "../Contact/Contact"; 
import styles from "../../css/ContactList.module.css";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.items); 
  const filter = useSelector((state) => state.filters.name); 
  const dispatch = useDispatch();

  // Filtracja kontaktów na podstawie nazwiska lub numeru telefonu
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()) ||
    contact.number.includes(filter)
  );

  // Usuwanie duplikatów kontaktów 
  const uniqueContacts = Array.from(
    new Map(filteredContacts.map(contact => [contact.number, contact])).values()
  );

  // Funkcja otwierająca modal
  const handleDelete = (contactId) => {
    dispatch(openModal(contactId)); 
  };

  // Funkcja wylogowująca
  const handleLogout = () => {
    dispatch(logOut()); 
  };

  return (
    <div className={styles.contactListContainer}>
      {uniqueContacts.map((contact) => (
        <div key={contact.id} className={styles.contactItem}>
          <Contact
            contactId={contact.id}
            name={contact.name}
            number={contact.number}
            onDelete={() => handleDelete(contact.id)}
          />
          <div className={styles.buttonContainer}>
            <Link to={`/contacts/edit/${contact.id}`} className={styles.editButton}>
              Edit
            </Link>
          </div>
        </div>
      ))}
      
      <div className={styles.logoutButtonContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ContactList;
